import { Key, ReactElement, useCallback, useState } from "react";
import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { orderTableColumns } from "./constants";
import { useGetOrderDetail, useGetOrders, useUpdateOrderStatus } from "./hooks";
import { Order } from "../../../api/orders/models";
import moment from "moment";
import { HiOutlineEye, HiX } from "react-icons/hi";
import { OrderFormModal } from "./components/OrderFormModal";
import { GetDetailOrderRequest } from "../../../api/orders/requests/order";
import { ConfirmForm } from "../../../components/ConfirmForm";
import { toast } from "react-hot-toast";
import { User } from "@nextui-org/user";
import {
  getNextOrderStatus,
  getOrderStatusColor,
  getOrderStatusName,
  NextOrderStatusIcon,
} from "../../../utils";
import { OrderStatus } from "../../../api/orders/models/enum";
import { TransactionFormModal } from "./components/TransactionFormModal";

export function OrdersPage(): ReactElement {
  const { data: orders, isLoading: loadingList } = useGetOrders();

  const [detailRequest, setDetailRequest] =
    useState<GetDetailOrderRequest | null>(null);

  const { data: detail } = useGetOrderDetail({ request: detailRequest });

  const { mutateAsync: updateStatusAsync, isLoading: updatingStatus } =
    useUpdateOrderStatus();

  const { isOpen: CUFormIsOpen, onOpenChange: CUFormOnOpenChange } =
    useDisclosure();

  const {
    isOpen: TransactionFormIsOpen,
    onOpenChange: TransactionFormOnOpenChange,
  } = useDisclosure();

  const {
    isOpen: ConfirmDelFormIsOpen,
    onOpenChange: ConfirmCancelFormOnOpenChange,
  } = useDisclosure();

  const {
    isOpen: ConfirmOrderFormIsOpen,
    onOpenChange: ConfirmOrderFormOnOpenChange,
  } = useDisclosure();

  const renderCell = useCallback(
    (order: Order, columnKey: number) => {
      const cellValue = order[orderTableColumns[columnKey].name];
      switch (orderTableColumns[columnKey].name) {
        case "customer":
          return (
            <User
              name={`${order.deliveryInformation?.customerName}
                  ${
                    order.deliveryInformation?.customerId !== null
                      ? ""
                      : "(Vãng lai)"
                  }`}
              description={order.deliveryInformation?.phone}
            ></User>
          );
        case "orderStatus":
          return (
            <Chip
              className="capitalize"
              size="sm"
              variant="flat"
              color={getOrderStatusColor(order.orderStatus)}
            >
              {getOrderStatusName(order.orderStatus)}
            </Chip>
          );
        case "transactions":
          return (
            <Button
              onClick={() => {
                setDetailRequest({ id: order.id });
                TransactionFormOnOpenChange();
              }}
            >
              {order.transactions.length} giao dịch
            </Button>
          );
        case "createdAt":
          return (
            <p>{moment(cellValue as string).format("DD/MM/YYYY hh:mm:ss")}</p>
          );
        case "total":
          return <p>{(cellValue as number).toLocaleString()} VNĐ</p>;
        case "updatedAt":
          return (
            <p>
              {cellValue !== null
                ? moment(cellValue as string).format("DD/MM/YYYY hh:mm:ss")
                : ""}
            </p>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip color={"primary"} content="Xem chi tiết">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => {
                    setDetailRequest({ id: order.id });
                    CUFormOnOpenChange();
                  }}
                >
                  <HiOutlineEye />
                </span>
              </Tooltip>
              {order.orderStatus !== OrderStatus.Success &&
                order.orderStatus !== OrderStatus.Cancelled && (
                  <>
                    <Tooltip
                      color={"primary"}
                      content={getOrderStatusName(
                        getNextOrderStatus(order.orderStatus),
                      )}
                    >
                      <span
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                        onClick={() => {
                          if (order.orderStatus !== OrderStatus.Success) {
                            setDetailRequest({ id: order.id });
                            ConfirmOrderFormOnOpenChange();
                          }
                        }}
                      >
                        {NextOrderStatusIcon(order.orderStatus)}
                      </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Hủy đơn">
                      <span
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                        onClick={() => {
                          if (order.orderStatus !== OrderStatus.Cancelled) {
                            setDetailRequest({ id: order.id });
                            ConfirmCancelFormOnOpenChange();
                          }
                        }}
                      >
                        <HiX />
                      </span>
                    </Tooltip>
                  </>
                )}
            </div>
          );
        default:
          return <p>{cellValue as string}</p>;
      }
    },
    [
      CUFormOnOpenChange,
      ConfirmCancelFormOnOpenChange,
      ConfirmOrderFormOnOpenChange,
    ],
  );

  const onSubmitConfirmOrder = async () => {
    if (detail?.data === null) return;
    const res = await updateStatusAsync({
      request: {
        id: detail?.data.id ?? -1,
        orderStatus: getNextOrderStatus(
          detail?.data.orderStatus ?? OrderStatus.Confirmed,
        ),
      },
    });

    if (res === null) {
      toast.error("Có lỗi không rỏ!");
    } else {
      ConfirmOrderFormOnOpenChange();
    }
  };
  const onSubmitCancelled = async () => {
    if (detail?.data === null) return;
    const res = await updateStatusAsync({
      request: {
        id: detail?.data.id ?? -1,
        orderStatus: OrderStatus.Cancelled,
      },
    });

    if (res === null) {
      toast.error("Có lỗi không rỏ!");
    } else {
      ConfirmCancelFormOnOpenChange();
    }
  };

  return (
    <div>
      <div className={"flex justify-between mb-3"}>
        <p className={"font-semibold mb-4"}>Danh sách các đơn hàng</p>
        {/*<Button*/}
        {/*  variant="solid"*/}
        {/*  color={"primary"}*/}
        {/*  startContent={<HiPlus />}*/}
        {/*  onClick={() => CUFormOnOpenChange()}*/}
        {/*>*/}
        {/*  Thêm*/}
        {/*</Button>*/}
      </div>
      <div>
        <Table aria-label="Example table with custom cells" fullWidth={true}>
          <TableHeader>
            {orderTableColumns.map((column) => (
              <TableColumn
                key={column.id}
                align={
                  [
                    "actions",
                    "status",
                    "orderStatus",
                    "transactionStatus",
                  ].includes(column.name)
                    ? "center"
                    : "start"
                }
              >
                {column.display}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody
            emptyContent={"Hỏng có gì để xem "}
            items={orders?.listData ?? []}
            isLoading={loadingList}
          >
            {(item: Order) => (
              <TableRow key={`Row${item.id}`}>
                {(col: Key) => (
                  <TableCell>{renderCell(item, col as number)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <OrderFormModal
        isOpen={CUFormIsOpen}
        onClose={() => {
          CUFormOnOpenChange();
          setDetailRequest(null);
        }}
        isUpdating={detailRequest !== null}
        onOpenChange={CUFormOnOpenChange}
        data={detailRequest !== null ? detail?.data : undefined}
      />
      <TransactionFormModal
        isOpen={TransactionFormIsOpen}
        onClose={() => {
          TransactionFormOnOpenChange();
          setDetailRequest(null);
        }}
        isUpdating={detailRequest !== null}
        onOpenChange={TransactionFormOnOpenChange}
        orderId={detailRequest?.id ?? -1}
      />

      <ConfirmForm
        name={"Từ chối đơn hàng này"}
        message={"Xác nhận từ chối đơn hàng này #" + detail?.data.id + " ?"}
        isOpen={ConfirmDelFormIsOpen}
        onClose={() => {
          ConfirmCancelFormOnOpenChange();
          setDetailRequest(null);
        }}
        onOpenChange={ConfirmCancelFormOnOpenChange}
        onSubmit={onSubmitCancelled}
        isLoading={updatingStatus}
      />

      <ConfirmForm
        name={"Xác nhận đơn hàng số #" + detail?.data.id}
        message={"Xác nhận đơn hàng số #" + detail?.data.id + " ?"}
        isOpen={ConfirmOrderFormIsOpen}
        onClose={() => {
          ConfirmOrderFormOnOpenChange();
          setDetailRequest(null);
        }}
        onOpenChange={ConfirmOrderFormOnOpenChange}
        onSubmit={onSubmitConfirmOrder}
        isLoading={updatingStatus}
      />
    </div>
  );
}
