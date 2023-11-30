import { CUForm } from "../../../../../components/CUForm";
import { useForm } from "react-hook-form";
import { Button, Chip, Skeleton, Textarea } from "@nextui-org/react";
import { useCreateOrder, useUpdateOrder } from "../../hooks/";
import { useEffect } from "react";
import { DeliveryInformation, Order } from "../../../../../api/orders/models";
import {
  CreateOrderRequest,
  UpdateOrderRequest,
} from "../../../../../api/orders/requests/order";
import { User } from "@nextui-org/user";
import { useGetProductsByIds } from "../../../../masterData/ProductsPage/hooks/useGetProductsByIds.tsx";
import { getOrderStatusColor, getOrderStatusName } from "../../../../../utils";
import { OrderStatus } from "../../../../../api/orders/models/enum";

interface OrderFormProps {
  data?: Order;
  isOpen: boolean;
  onClose: () => void;

  isUpdating: boolean;
  onOpenChange: (isOpen?: boolean) => void;
}

export function OrderFormModal({
  data,
  isOpen,
  onClose,
  onOpenChange,
  isUpdating,
}: OrderFormProps) {
  const { register, handleSubmit, reset } = useForm<DeliveryInformation>({
    defaultValues: {
      ...data?.deliveryInformation,
    },
  });

  const { mutateAsync: createAsync, isLoading: createLoading } =
    useCreateOrder();
  const { mutateAsync: updateAsync, isLoading: updateLoading } =
    useUpdateOrder();

  const { data: products, isFetched } = useGetProductsByIds({
    request: { ids: data?.orderDetails.map((item) => item.productId) ?? [] },
  });

  useEffect(() => {
    reset({
      ...data,
    });
  }, [data, reset]);

  const onSubmit = async (data: UpdateOrderRequest) => {
    let res;
    if (isUpdating) res = await updateAsync(data);
    else res = await createAsync(data as CreateOrderRequest);

    if (res !== null) {
      onClose();
    }
  };

  const closeEndReset = () => {
    onClose();
    onClear();
  };

  const onClear = () => {
    reset({
      name: "",
    });
  };

  return (
    <CUForm<UpdateOrderRequest>
      name={
        <p>
          Chi tiết đơn hàng {`${data !== undefined ? "#" + data.id : ""}`}{" "}
          &nbsp;
          {data !== undefined && (
            <Chip
              className="capitalize"
              size="sm"
              variant="flat"
              color={getOrderStatusColor(data?.orderStatus)}
            >
              {getOrderStatusName(data?.orderStatus)}
            </Chip>
          )}
        </p>
      }
      isOpen={isOpen}
      isUpdating={isUpdating}
      onClose={closeEndReset}
      onOpenChange={onOpenChange}
      isLoading={createLoading || updateLoading}
      onSubmit={
        data?.orderStatus !== OrderStatus.Success &&
        data?.orderStatus !== OrderStatus.Cancelled
          ? onSubmit
          : undefined
      }
      handleSubmit={handleSubmit}
    >
      <div className={"grid grid-cols-2 gap-2"}>
        <div className={"grid grid-cols-2 gap-2 col-span-1 flex flex-col"}>
          <div className={"col-span-2 flex flex-col gap-2"}>
            <p className={"font-semibold mb-2"}>Khách hàng</p>
            <Button
              variant={"ghost"}
              className={"px-7 py-8 w-full flex justify-start"}
            >
              <User
                name={`${data?.deliveryInformation.customerName}
                    ${
                      data?.deliveryInformation.customerId !== null
                        ? ""
                        : "(Vãng lai)"
                    }`}
                description={data?.deliveryInformation.phone}
              ></User>
            </Button>
            <Textarea
              defaultValue={data?.deliveryInformation.fullAddress}
              {...register("fullAddress")}
              placeholder={"Thông tin địa chỉ"}
              label={"Địa chỉ giao hàng"}
              isReadOnly={true}
            />
            <Textarea
              defaultValue={data?.note}
              placeholder={"Ghi chú"}
              label={"Ghi chú"}
            />
          </div>
        </div>

        <div className={"flex flex-col gap-2 col-span-1 relative"}>
          <p className={"font-semibold mb-2"}>
            Danh sách đơn hàng ({products?.listData.length} món)
          </p>
          <div
            className={
              "p-4 shadow rounded-t-md border-t-4 border-t-blue-800 max-h-full overflow-y-hidden"
            }
          >
            <Skeleton className={"w-full h-full"} isLoaded={isFetched}>
              <div className={"flex flex-col gap-4 h-full overflow-y-auto"}>
                {data?.orderDetails.map((item) => {
                  const product = products?.listData.find(
                    (x) => x.id === item.productId,
                  );

                  return (
                    <div
                      className={
                        "grid grid-cols-4 gap-2 justify-between items-center"
                      }
                    >
                      <User
                        avatarProps={{
                          radius: "lg",
                          src: product?.imageUrls,
                          className: " min-w-[50px] min-h-[50px]",
                        }}
                        description={product?.brand?.name}
                        name={product?.name}
                        className={"col-span-3"}
                      />
                      <div className={"col-span-1 text-end"}>
                        x {item.amount}
                        <br /> <b>{item.sizeCode}</b>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Skeleton>
          </div>
        </div>
      </div>
    </CUForm>
  );
}
