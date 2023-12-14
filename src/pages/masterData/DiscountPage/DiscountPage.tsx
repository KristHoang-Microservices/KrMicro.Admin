import { Key, ReactElement, useCallback, useMemo, useState } from "react";
import {
  Button,
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { promoTableColumns } from "./constants/promoTableColumns.ts";
import { useGetPromo, useGetPromoDetail, useUpdatePromoStatus } from "./hooks";
import { Promo } from "../../../api/orders/models";
import moment from "moment";
import { getStatusColor, getStatusName } from "../../../utils";
import { HiOutlinePencil, HiOutlineTrash, HiPlus } from "react-icons/hi";
import { PromoFormModal } from "./components/PromoFormModal";
import { GetDetailPromoRequest } from "../../../api/orders/requests/promo";
import { ConfirmForm } from "../../../components/ConfirmForm";
import { Status } from "../../../models/status.enum.ts";
import { toast } from "react-hot-toast";
import { PromoUnitRender } from "../../../components/PromoUnitRender";
import { PromoUnit } from "../../../api/orders/models/enum";

export function DiscountPage(): ReactElement {
  const { data: promos, isLoading: loadingList } = useGetPromo();

  const [detailRequest, setDetailRequest] =
    useState<GetDetailPromoRequest | null>(null);

  const { data: detail } = useGetPromoDetail({ request: detailRequest });

  const { mutateAsync: updateStatusAsync, isLoading: updatingStatus } =
    useUpdatePromoStatus();

  const { isOpen: CUFormIsOpen, onOpenChange: CUFormOnOpenChange } =
    useDisclosure();
  const {
    isOpen: ConfirmDelFormIsOpen,
    onOpenChange: ConfirmDelFormOnOpenChange,
  } = useDisclosure();

  const renderCell = useCallback(
    (promo: Promo, columnKey: number) => {
      const cellValue = promo[promoTableColumns[columnKey].name];
      switch (promoTableColumns[columnKey].name) {
        case "promo":
          return (
            <div className={"font-semibold"}>
              <p>🎉 {promo.name}</p>
              <p className={"text-sm text-accent-700"}>
                Mã áp dụng: {promo.code}
              </p>
            </div>
          );
        case "promoUnit":
          return <PromoUnitRender promoUnit={cellValue as PromoUnit} />;
        case "value":
          return promo.promoUnit === PromoUnit.Raw ? (
            <p>{((cellValue as number) ?? 0).toLocaleString()} VND</p>
          ) : (
            <p>{((cellValue as number) ?? 0) * 100} %</p>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              size="sm"
              variant="flat"
              color={getStatusColor(promo.status)}
            >
              {getStatusName(promo.status)}
            </Chip>
          );
        case "createdAt":
        case "updatedAt":
        case "startDate":
        case "endDate":
          return (
            <p>
              {cellValue !== null
                ? moment(cellValue as string).format("DD/MM/YYYY")
                : ""}
            </p>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip color={"primary"} content="Sửa">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => {
                    setDetailRequest({ id: promo.id });
                    CUFormOnOpenChange();
                  }}
                >
                  <HiOutlinePencil />
                </span>
              </Tooltip>

              <Tooltip color="danger" content="Xóa">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => {
                    setDetailRequest({ id: promo.id });
                    ConfirmDelFormOnOpenChange();
                  }}
                >
                  <HiOutlineTrash />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return <p>{cellValue as string}</p>;
      }
    },
    [CUFormOnOpenChange, ConfirmDelFormOnOpenChange],
  );

  const onSubmitConfirmDelete = async () => {
    if (detail?.data === null) return;
    const res = await updateStatusAsync({
      request: {
        id: detail?.data.id ?? -1,
        status: Status.Delete,
      },
    });

    if (res === null) {
      toast.error("Có lỗi không rỏ!");
    } else {
      ConfirmDelFormOnOpenChange();
    }
  };

  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  const pages = Math.ceil((promos?.listData?.length ?? 0) / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return promos?.listData?.slice(start, end);
  }, [page, promos?.listData]);

  return (
    <div>
      <div className={"flex justify-between mb-3"}>
        <p className={"font-semibold mb-4"}>Danh sách sản phẩm</p>
        <Button
          variant="solid"
          color={"primary"}
          startContent={<HiPlus />}
          onClick={() => CUFormOnOpenChange()}
        >
          Thêm
        </Button>
      </div>
      <div>
        <Table
          aria-label="Example table with custom cells"
          fullWidth={true}
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
        >
          <TableHeader>
            {promoTableColumns.map((column) => (
              <TableColumn
                key={column.id}
                align={column.name === "actions" ? "center" : "start"}
              >
                {column.display}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody
            emptyContent={"Hỏng có gì để xem "}
            items={items ?? []}
            isLoading={loadingList}
          >
            {(item: Promo) => (
              <TableRow key={item.id}>
                {(col: Key) => (
                  <TableCell>{renderCell(item, col as number)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <PromoFormModal
        isOpen={CUFormIsOpen}
        onClose={() => {
          CUFormOnOpenChange();
          setDetailRequest(null);
        }}
        isUpdating={detailRequest !== null}
        onOpenChange={CUFormOnOpenChange}
        data={detailRequest !== null ? detail?.data : undefined}
      />

      <ConfirmForm
        name={"Xóa sản phẩm"}
        message={"Xác nhận xóa sản phẩm này " + detail?.data.name + " ?"}
        isOpen={ConfirmDelFormIsOpen}
        onClose={() => {
          ConfirmDelFormOnOpenChange();
          setDetailRequest(null);
        }}
        onOpenChange={ConfirmDelFormOnOpenChange}
        onSubmit={onSubmitConfirmDelete}
        isLoading={updatingStatus}
      />
    </div>
  );
}
