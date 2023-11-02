import { Product } from "../../../../../api/masterData/models";
import { CUForm } from "../../../../../components/CUFrom";
import { useFieldArray, useForm } from "react-hook-form";
import { UpdateProductStockRequest } from "../../../../../api/masterData/requests/product";
import { Button, Input, Tooltip } from "@nextui-org/react";
import { useUpdateProductStock } from "../../hooks/";
import { useEffect } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

interface SizeFormProps {
  data?: Product;
  isOpen: boolean;
  onClose: () => void;

  isUpdating: boolean;
  onOpenChange: (isOpen?: boolean) => void;
}

export function SizeFormModal({
  data,
  isOpen,
  onClose,
  onOpenChange,
  isUpdating,
}: SizeFormProps) {
  const { control, register, handleSubmit, reset } =
    useForm<UpdateProductStockRequest>({
      defaultValues: {
        productSizes: data?.productSizes ?? [],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "productSizes",
  });
  const { mutateAsync: updateAsync, isLoading: updateLoading } =
    useUpdateProductStock();

  useEffect(() => {
    reset({
      id: data?.id,
      productSizes: data?.productSizes,
    });
  }, [data, reset]);

  const onSubmit = async (data: UpdateProductStockRequest) => {
    const res = await updateAsync(data);

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
      productSizes: [],
    });
  };

  return (
    <CUForm<UpdateProductStockRequest>
      name={
        isUpdating ? "Cập nhật số lượng sản phẩm" : "Thêm số lượng sản phẩm"
      }
      isOpen={isOpen}
      isUpdating={isUpdating}
      onClose={closeEndReset}
      onOpenChange={onOpenChange}
      isLoading={updateLoading}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      onReset={() => onClear()}
    >
      {fields.map((field, index) => (
        <div className={"flex gap-2 justify-center items-center"}>
          <div className={"grid grid-cols-3 gap-4 flex-1"}>
            <div className={"col-span-1"} key={`Size${index}`}>
              <Input
                defaultValue={data?.productSizes[index]?.size?.sizeCode ?? ""}
                {...register(`productSizes.${index}.sizeCode`)}
                label={"Size"}
              />
            </div>
            <div className={"col-span-1"} key={`Price${index}`}>
              <Input
                defaultValue={`${field?.price ?? ""}`}
                {...register(`productSizes.${index}.price`)}
                label={"Đơn giá"}
              />
            </div>
            <div className={"col-span-1"} key={`Stock${index}`}>
              <Input
                defaultValue={`${field?.stock ?? ""}`}
                {...register(`productSizes.${index}.stock`)}
                label={"Kho"}
              />
            </div>
          </div>
          <div className={"w-fit"}>
            <div className={"flex gap-2 px-6"}>
              <Tooltip content={"Xóa size"}>
                <Button
                  isIconOnly
                  color={"warning"}
                  onClick={() => remove(index)}
                >
                  <HiMinus />
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      ))}
      <div className={"w-full mt-4"}>
        <Button
          color={"primary"}
          fullWidth={true}
          onClick={() => append({ sizeCode: "", stock: 0, price: 0 })}
        >
          <HiPlus />
          Thêm size
        </Button>
      </div>
    </CUForm>
  );
}
