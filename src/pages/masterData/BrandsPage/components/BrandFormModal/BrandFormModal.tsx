import { Brand } from "../../../../../api/masterData/models";
import { CUForm } from "../../../../../components/CUFrom";
import { useForm } from "react-hook-form";
import {
  CreateBrandRequest,
  UpdateBrandRequest,
} from "../../../../../api/masterData/requests/brand";
import { Image, Input } from "@nextui-org/react";
import { useCreateBrand, useUpdateBrand } from "../../hooks/";
import { useEffect } from "react";

interface BrandFormProps {
  data?: Brand;
  isOpen: boolean;
  onClose: () => void;

  isUpdating: boolean;
  onOpenChange: (isOpen?: boolean) => void;
}

export function BrandFormModal({
  data,
  isOpen,
  onClose,
  onOpenChange,
  isUpdating,
}: BrandFormProps) {
  const { register, watch, handleSubmit, reset } = useForm<UpdateBrandRequest>({
    defaultValues: {
      name: data?.name,
    },
  });

  const { mutateAsync: createAsync, isLoading: createLoading } =
    useCreateBrand();
  const { mutateAsync: updateAsync, isLoading: updateLoading } =
    useUpdateBrand();

  useEffect(() => {
    reset({
      ...data,
    });
  }, [data, reset]);

  const onSubmit = async (data: UpdateBrandRequest) => {
    let res;
    if (isUpdating) res = await updateAsync(data);
    else res = await createAsync(data as CreateBrandRequest);

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
    <CUForm<UpdateBrandRequest>
      name={isUpdating ? "Cập nhật nhãn hiệu" : "Thêm nhãn hiệu"}
      isOpen={isOpen}
      isUpdating={isUpdating}
      onClose={closeEndReset}
      onOpenChange={onOpenChange}
      isLoading={createLoading || updateLoading}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      onReset={() => onClear()}
    >
      <div className={"grid grid-cols-2 gap-2"}>
        <div className={"grid grid-cols-2 gap-2 col-span-1"}>
          <div className={"col-span-2"}>
            <Input
              defaultValue={data?.name ?? " "}
              {...register("name")}
              label={"Tên nhãn hiệu"}
            />
          </div>
          <div className={"col-span-2"}>
            <Input
              defaultValue={data?.imageUrl ?? " "}
              {...register("imageUrl")}
              label={"URL ảnh (Tạm)"}
            />
          </div>
        </div>

        <div className={"flex flex-col gap-2 col-span-1 relative"}>
          <Image
            src={watch("imageUrl")}
            isLoading={watch("imageUrl") === undefined}
            className={"w-full object-cover"}
          />
        </div>
      </div>
    </CUForm>
  );
}
