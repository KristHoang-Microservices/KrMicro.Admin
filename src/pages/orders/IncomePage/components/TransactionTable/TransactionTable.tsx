import { Key, ReactElement, useCallback, useMemo, useState } from "react";
import {
  Chip,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { transactionTableColumns } from "../../constants";
import { useGetTransactions } from "../../hooks";
import { Transaction } from "../../../../../api/orders/models";
import moment, { Moment } from "moment";
import { GetAllTransactionRequest } from "../../../../../api/orders/requests/transaction";
import { User } from "@nextui-org/user";
import {
  getTransactionStatusColor,
  getTransactionStatusName,
} from "../../../../../utils";
import {
  TransactionStatus,
  TransactionStatusArray,
} from "../../../../../api/orders/models/enum";
import { CalendarModal } from "../../../../../components/CalendarModal";
import { tableDisplayItemLengths } from "../../../../../constants";

export function TransactionTable(): ReactElement {
  const [transactionsRequest, setTransactionRequest] = useState<
    GetAllTransactionRequest | undefined
  >();
  const {
    data: transactions,
    isLoading: loadingList,
    isFetching,
  } = useGetTransactions(transactionsRequest);

  const {
    isOpen: CalendarFromDateFormIsOpen,
    onOpenChange: CalendarFromDateFormOnOpenChange,
  } = useDisclosure();
  const {
    isOpen: CalendarToDateFormIsOpen,
    onOpenChange: CalendarToDateFormOnOpenChange,
  } = useDisclosure();

  const renderCell = useCallback(
    (transaction: Transaction, columnKey: number) => {
      const cellValue = transaction[transactionTableColumns[columnKey].name];
      switch (transactionTableColumns[columnKey].name) {
        case "customer":
          return (
            <div className={"w-full flex justify-start"}>
              <User
                name={`${transaction.customerName}
                    ${transaction.customerId !== null ? "" : "(Vãng lai)"}`}
                description={transaction.phoneNumber}
                classNames={{
                  name: "line-clamp-2 text-ellipsis overflow-hidden",
                }}
                avatarProps={{ className: "min-w-[40px] min-h-[40px]" }}
                className={"max-w-[100px]"}
              ></User>
            </div>
          );
        case "transactionStatus":
          return (
            <Chip
              className="capitalize"
              size="sm"
              variant="flat"
              color={getTransactionStatusColor(transaction.transactionStatus)}
            >
              {getTransactionStatusName(transaction.transactionStatus)}
            </Chip>
          );
        case "order":
          return (
            // <Button
            //   onClick={() => {
            //     setDetailRequest({ id: transaction.id });
            //     TransactionFormOnOpenChange();
            //   }}
            // >
            //   {transaction.transactions.length} giao dịch
            // </Button>
            <p className={"font-semibold"}>#{transaction.orderId}</p>
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
        // case "actions":
        //   return (
        //     <div className="relative flex items-center gap-2">
        //       <Tooltip color={"primary"} content="Xem chi tiết">
        //         <span
        //           className="text-lg text-default-400 cursor-pointer active:opacity-50"
        //           onClick={() => {
        //             setDetailRequest({ id: transaction.id });
        //             CUFormOnOpenChange();
        //           }}
        //         >
        //           <HiOutlineEye />
        //         </span>
        //       </Tooltip>
        //       {transaction.transactionStatus !== TransactionStatus.Success &&
        //         transaction.transactionStatus !== TransactionStatus.Cancel && (
        //           <>
        //             <Tooltip
        //               color={"primary"}
        //               content={getTransactionStatusName(
        //                 getNextTransactionStatus(transaction.transactionStatus),
        //               )}
        //             >
        //               <span
        //                 className="text-lg text-danger cursor-pointer active:opacity-50"
        //                 onClick={() => {
        //                   if (
        //                     transaction.transactionStatus !==
        //                     TransactionStatus.Success
        //                   ) {
        //                     setDetailRequest({ id: transaction.id });
        //                     ConfirmTransactionFormOnOpenChange();
        //                   }
        //                 }}
        //               >
        //                 {NextTransactionStatusIcon(
        //                   transaction.transactionStatus,
        //                 )}
        //               </span>
        //             </Tooltip>
        //             <Tooltip color="danger" content="Hủy thanh toán">
        //               <span
        //                 className="text-lg text-danger cursor-pointer active:opacity-50"
        //                 onClick={() => {
        //                   if (
        //                     transaction.transactionStatus !==
        //                     TransactionStatus.Cancel
        //                   ) {
        //                     setDetailRequest({ id: transaction.id });
        //                     ConfirmCancelFormOnOpenChange();
        //                   }
        //                 }}
        //               >
        //                 <HiX />
        //               </span>
        //             </Tooltip>
        //           </>
        //         )}
        //     </div>
        //   );
        default:
          return <p>{cellValue as string}</p>;
      }
    },
    [],
  );

  // // Search element
  //
  // const [searchFilter, setSearchFilter] = useState<string | undefined>();
  // const onSearchChange = () => {};

  const searchEngine = useMemo(() => {
    return (
      <div className={"flex flex-col gap-4"}>
        <div className={"flex gap-4"}>
          <Select
            label={"Trạng thái giao dịch"}
            size={"sm"}
            items={TransactionStatusArray}
            onChange={(value) => {
              setTransactionRequest((prev) => ({
                ...prev,
                transactionStatus:
                  value.target.value === ""
                    ? undefined
                    : Object.values(TransactionStatus).findIndex(
                        (x) => x === value.target.value,
                      ),
              }));
            }}
          >
            {TransactionStatusArray.map((item: string, index: number) => (
              <SelectItem
                key={TransactionStatus[index]}
                value={TransactionStatus[index]}
                textValue={item}
              >
                {item}
              </SelectItem>
            ))}
          </Select>
          <Input
            isReadOnly={true}
            label={"Từ ngày"}
            size={"sm"}
            onClick={CalendarFromDateFormOnOpenChange}
            value={
              transactionsRequest?.fromDate === undefined
                ? undefined
                : moment(transactionsRequest?.fromDate).format(
                    "dddd DD/MM/YYYY",
                  )
            }
            isClearable={true}
            onClear={() =>
              setTransactionRequest((prev?: GetAllTransactionRequest) => ({
                ...prev,
                fromDate: undefined,
              }))
            }
          />
          <Input
            isReadOnly={true}
            label={"Đến ngày"}
            size={"sm"}
            onClick={CalendarToDateFormOnOpenChange}
            value={
              transactionsRequest?.toDate === undefined
                ? undefined
                : moment(transactionsRequest?.toDate).format("dddd DD/MM/YYYY")
            }
            isClearable={true}
            onClear={() =>
              setTransactionRequest((prev?: GetAllTransactionRequest) => ({
                ...prev,
                toDate: undefined,
              }))
            }
          />
        </div>
        <div>
          <p className={"text-sm text-gray-600 font-semibold"}>
            Tổng cộng : {transactions?.listData.length ?? 0} đơn hàng
          </p>
        </div>
      </div>
    );
  }, [
    CalendarFromDateFormOnOpenChange,
    CalendarToDateFormOnOpenChange,
    transactions?.listData.length,
    transactionsRequest?.fromDate,
    transactionsRequest?.toDate,
  ]);

  // const onSubmitConfirmTransaction = async () => {
  //   if (detail?.data === null) return;
  //   const res = await updateStatusAsync({
  //     request: {
  //       id: detail?.data.id ?? -1,
  //       transactionStatus: getNextTransactionStatus(
  //         detail?.data.transactionStatus ?? TransactionStatus.Success,
  //       ),
  //     },
  //   });
  //
  //   if (res === null) {
  //     toast.error("Có lỗi không rỏ!");
  //   } else {
  //     ConfirmTransactionFormOnOpenChange();
  //   }
  // };
  // const onSubmitCancelled = async () => {
  //   if (detail?.data === null) return;
  //   const res = await updateStatusAsync({
  //     request: {
  //       id: detail?.data.id ?? -1,
  //       transactionStatus: TransactionStatus.Cancel,
  //     },
  //   });
  //
  //   if (res === null) {
  //     toast.error("Có lỗi không rỏ!");
  //   } else {
  //     ConfirmCancelFormOnOpenChange();
  //   }
  // };

  // FE Pagination
  const [page, setPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(6);

  const pages = Math.ceil((transactions?.listData ?? []).length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return transactions?.listData.slice(start, end);
  }, [page, rowsPerPage, transactions?.listData]);

  const [selectedKeys, setSelectedKeys] = useState<Iterable<Key>>([]);

  return (
    <div>
      <div className={"flex justify-between mb-3"}>
        <p className={"font-semibold mb-4"}>Danh sách Giao dịch</p>
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
        <Table
          fullWidth={true}
          selectionMode={"single"}
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          topContent={searchEngine}
          bottomContent={
            isFetching ? (
              <div className={"flex w-full justify-center"}>
                <Spinner />
              </div>
            ) : (
              <div className="flex w-full justify-between">
                <div className={"w-[100px]"} />
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="secondary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
                <div className={"w-[100px]"}>
                  <Select
                    label={"Hiển thị"}
                    size={"sm"}
                    onChange={(value) => {
                      setRowsPerPage(parseInt(value.target.value));
                    }}
                    value={rowsPerPage}
                    defaultSelectedKeys={["6"]}
                  >
                    {tableDisplayItemLengths.map((item) => {
                      return (
                        <SelectItem
                          value={item}
                          key={item.toString()}
                          textValue={item.toString()}
                        >
                          {item}
                        </SelectItem>
                      );
                    })}
                  </Select>
                </div>
              </div>
            )
          }
          className={"w-full overflow-x-auto"}
        >
          <TableHeader>
            {transactionTableColumns.map((column) => (
              <TableColumn
                key={column.id}
                align={
                  [
                    "actions",
                    "status",
                    "transactionStatus",
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
            emptyContent={!isFetching && "Hỏng có gì để xem "}
            items={items ?? []}
            isLoading={loadingList}
          >
            {(item: Transaction) => (
              <TableRow key={`${item.id}`}>
                {(col: Key) => (
                  <TableCell>{renderCell(item, col as number)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <CalendarModal
        isOpen={CalendarFromDateFormIsOpen}
        onOpenChange={CalendarFromDateFormOnOpenChange}
        onSubmit={(date: Moment) =>
          setTransactionRequest((prev?: GetAllTransactionRequest) => ({
            ...prev,
            fromDate: date.startOf("day").format(),
          }))
        }
        maxDate={
          transactionsRequest?.toDate != undefined
            ? moment(transactionsRequest.toDate)
            : moment(new Date())
        }
      />

      <CalendarModal
        isOpen={CalendarToDateFormIsOpen}
        onOpenChange={CalendarToDateFormOnOpenChange}
        onSubmit={(date: Moment) =>
          setTransactionRequest((prev?: GetAllTransactionRequest) => ({
            ...prev,
            toDate: date.endOf("day").format(),
          }))
        }
        minDate={
          transactionsRequest?.fromDate != undefined
            ? moment(transactionsRequest.fromDate)
            : undefined
        }
        maxDate={moment(new Date())}
      />

      {/*<TransactionFormModal*/}
      {/*  isOpen={CUFormIsOpen}*/}
      {/*  onClose={() => {*/}
      {/*    CUFormOnOpenChange();*/}
      {/*    setDetailRequest(null);*/}
      {/*  }}*/}
      {/*  isUpdating={detailRequest !== null}*/}
      {/*  onOpenChange={CUFormOnOpenChange}*/}
      {/*  data={detailRequest !== null ? detail?.data : undefined}*/}
      {/*/>*/}
      {/*<TransactionFormModal*/}
      {/*  isOpen={TransactionFormIsOpen}*/}
      {/*  onClose={() => {*/}
      {/*    TransactionFormOnOpenChange();*/}
      {/*    setDetailRequest(null);*/}
      {/*  }}*/}
      {/*  isUpdating={detailRequest !== null}*/}
      {/*  onOpenChange={TransactionFormOnOpenChange}*/}
      {/*  transactionId={detailRequest?.id ?? -1}*/}
      {/*/>*/}

      {/*<ConfirmForm*/}
      {/*  name={"Từ chối đơn hàng này"}*/}
      {/*  message={"Xác nhận từ chối đơn hàng này #" + detail?.data.id + " ?"}*/}
      {/*  isOpen={ConfirmDelFormIsOpen}*/}
      {/*  onClose={() => {*/}
      {/*    ConfirmCancelFormOnOpenChange();*/}
      {/*    setDetailRequest(null);*/}
      {/*  }}*/}
      {/*  onOpenChange={ConfirmCancelFormOnOpenChange}*/}
      {/*  onSubmit={onSubmitCancelled}*/}
      {/*  isLoading={updatingStatus}*/}
      {/*/>*/}

      {/*<ConfirmForm*/}
      {/*  name={"Xác nhận đơn hàng số #" + detail?.data.id}*/}
      {/*  message={"Xác nhận đơn hàng số #" + detail?.data.id + " ?"}*/}
      {/*  isOpen={ConfirmTransactionFormIsOpen}*/}
      {/*  onClose={() => {*/}
      {/*    ConfirmTransactionFormOnOpenChange();*/}
      {/*    setDetailRequest(null);*/}
      {/*  }}*/}
      {/*  onOpenChange={ConfirmTransactionFormOnOpenChange}*/}
      {/*  onSubmit={onSubmitConfirmTransaction}*/}
      {/*  isLoading={updatingStatus}*/}
      {/*/>*/}
    </div>
  );
}
