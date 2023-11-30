import { CUForm } from "../../../../../components/CUForm";
import { Transaction } from "../../../../../api/orders/models";
import { UpdateOrderRequest } from "../../../../../api/orders/requests/order";
import { memo, useEffect, useState } from "react";
import {
  getTransactionStatusColor,
  getTransactionStatusName,
} from "../../../../../utils";
import { Button, Chip, Skeleton } from "@nextui-org/react";
import moment from "moment/moment";
import { useUpdateTransactionStatus } from "../../hooks/useUpdateTransactionStatus.tsx";
import { TransactionStatus } from "../../../../../api/orders/models/enum";
import { useGetTransaction } from "../../hooks";

interface OrderFormProps {
  orderId: number;
  isOpen: boolean;
  onClose: () => void;

  isUpdating: boolean;
  onOpenChange: (isOpen?: boolean) => void;
}

export function TransactionFormModalBuild({
  isOpen,
  onClose,
  onOpenChange,
  isUpdating,
  orderId,
}: OrderFormProps) {
  // const { register, handleSubmit, reset } = useForm<Transaction>({
  //   defaultValues: {
  //     ...data,
  //   },
  // });

  // const { mutateAsync: createAsync, isLoading: createLoading } =
  //   useCreateTransaction();
  // const { mutateAsync: updateAsync, isLoading: updateLoading } =
  //   useUpdateTransaction();

  const { mutateAsync: updateStatusMutate, isLoading: updating } =
    useUpdateTransactionStatus();

  const { data, isFetched } = useGetTransaction({ request: { orderId } });

  // useEffect(() => {
  //   reset({
  //     ...data,
  //   });
  // }, [data, reset]);

  // const onSubmit = async (data: UpdateOrderRequest) => {
  //   let res;
  //   if (isUpdating) res = await updateAsync(data);
  //   else res = await createAsync(data as CreateOrderRequest);
  //
  //   if (res !== null) {
  //     onClose();
  //   }
  // };

  const onUpdateStatus = async (newStatus: TransactionStatus) => {
    await updateStatusMutate({
      request: {
        id: selectedTransaction?.id ?? -1,
        transactionStatus: newStatus,
      },
    });
  };

  const [selectedTransaction, setTransaction] = useState<
    Transaction | undefined
  >();

  useEffect(() => {
    setTransaction(undefined);
  }, [data, orderId]);

  const closeEndReset = () => {
    onClose();
    onClear();
  };

  const onClear = () => {
    // reset({
    //   name: "",
    // });
  };

  return (
    <CUForm<UpdateOrderRequest>
      name={
        <p>
          Các giao dịch thanh toán của{" "}
          {`${data !== undefined ? "#" + orderId : ""}`} &nbsp;
          {/*{data !== undefined && (*/}
          {/*  <Chip*/}
          {/*    className="capitalize"*/}
          {/*    size="sm"*/}
          {/*    variant="flat"*/}
          {/*    color={getOrderStatusColor(data?.orderStatus)}*/}
          {/*  >*/}
          {/*    {getOrderStatusName(data?.orderStatus)}*/}
          {/*  </Chip>*/}
          {/*)}*/}
        </p>
      }
      isOpen={isOpen}
      isUpdating={isUpdating}
      onClose={closeEndReset}
      onOpenChange={onOpenChange}
      isLoading={false}
      // onSubmit={
      //   data?.transactionStatus !== TransactionStatus.Cancel &&
      //   data?.transactionStatus !== TransactionStatus.Success
      //     ? onSubmit
      //     : undefined
      // }
      // handleSubmit={handleSubmit}
    >
      <Skeleton isLoaded={isFetched} className={"w-full h-[300px]"}>
        {(data?.listData.length ?? -1) > 0 ? (
          <div className={"grid grid-cols-2 gap-4"}>
            <div className={"grid grid-cols-2 gap-2 col-span-1"}>
              <div
                className={
                  "max-h-full overflow-y-auto col-span-2 flex flex-col gap-2"
                }
              >
                {data?.listData.map((item) => {
                  return (
                    <div
                      key={`Transaction#${item.id}`}
                      className={
                        "relative p-4 border-1 rounded-xl hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                      }
                      onClick={() => setTransaction(item)}
                    >
                      <p className={"font-semibold"}>Giao dịch #{item.id}</p>
                      <p className={""}>{item.paymentMethod.name}</p>
                      <p className={"font-semibold"}>
                        {item.total.toLocaleString()} VND
                      </p>
                      <Chip
                        className={"absolute top-2 right-2"}
                        size={"sm"}
                        color={getTransactionStatusColor(
                          item.transactionStatus,
                        )}
                      >
                        {getTransactionStatusName(item.transactionStatus)}
                      </Chip>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={"flex flex-col gap-4 col-span-1 relative"}>
              {selectedTransaction !== undefined ? (
                <>
                  <div className={"flex gap-2 mb-4"}>
                    <p
                      className={"font-semibold"}
                    >{`Chi tiết giao dịch #${selectedTransaction.id}`}</p>
                    <Chip
                      size={"sm"}
                      color={getTransactionStatusColor(
                        selectedTransaction.transactionStatus,
                      )}
                    >
                      {getTransactionStatusName(
                        selectedTransaction.transactionStatus,
                      )}
                    </Chip>
                  </div>
                  <div className={"flex gap-2"}>
                    <p className={"font-semibold"}>Phương thức thanh toán</p>
                    <Chip size={"sm"} color={"primary"}>
                      {selectedTransaction.paymentMethod.name}
                    </Chip>
                  </div>
                  <div className={"flex gap-2"}>
                    <p className={"font-semibold"}>Giá trị giao dịch</p>
                    <p>{selectedTransaction.total} VNĐ</p>
                  </div>
                  <div className={"flex gap-2"}>
                    <p className={"font-semibold"}>Ngày tạo</p>
                    <p>
                      {moment(selectedTransaction.createdAt).format(
                        "DD/MM/YYYY hh:mm:ss",
                      )}{" "}
                      VNĐ
                    </p>
                  </div>
                  <div className={"flex gap-2"}>
                    <Button
                      color={"primary"}
                      isLoading={updating}
                      onClick={() => onUpdateStatus(TransactionStatus.Success)}
                      isDisabled={
                        !(
                          selectedTransaction?.transactionStatus !==
                            TransactionStatus.Failed &&
                          selectedTransaction?.transactionStatus !==
                            TransactionStatus.Success &&
                          selectedTransaction?.transactionStatus !==
                            TransactionStatus.Cancel
                        )
                      }
                    >
                      Xác nhận đã thanh toán
                    </Button>
                    <Button
                      color={"danger"}
                      isLoading={updating}
                      onClick={() => onUpdateStatus(TransactionStatus.Cancel)}
                      isDisabled={
                        !(
                          selectedTransaction?.transactionStatus !==
                            TransactionStatus.Failed &&
                          selectedTransaction?.transactionStatus !==
                            TransactionStatus.Success &&
                          selectedTransaction?.transactionStatus !==
                            TransactionStatus.Cancel
                        )
                      }
                    >
                      Hủy giao dịch
                    </Button>
                  </div>
                </>
              ) : (
                <div className={"flex items-center justify-center h-full"}>
                  Hãy chọn 1 giao dịch
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={"flex items-center justify-center h-full"}>
            Chưa có giao dịch nào
          </div>
        )}
      </Skeleton>
    </CUForm>
  );
}

export const TransactionFormModal = memo(TransactionFormModalBuild);
