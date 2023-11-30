import { Category } from "../../../../../api/masterData/models";
import { CUForm } from "../../../../../components/CUForm";
import { useForm } from "react-hook-form";
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../../../../../api/masterData/requests/category";
import { Input } from "@nextui-org/react";
import { useCreateCategory, useUpdateCategory } from "../../hooks/";
import { useEffect } from "react";

interface CategoryFormProps {
  data?: Category;
  isOpen: boolean;
  onClose: () => void;

  isUpdating: boolean;
  onOpenChange: (isOpen?: boolean) => void;
}

export function CategoryFormModal({
  data,
  isOpen,
  onClose,
  onOpenChange,
  isUpdating,
}: CategoryFormProps) {
  const { register, handleSubmit, reset } = useForm<UpdateCategoryRequest>({
    defaultValues: {
      name: data?.name,
    },
  });

  const { mutateAsync: createAsync, isLoading: createLoading } =
    useCreateCategory();
  const { mutateAsync: updateAsync, isLoading: updateLoading } =
    useUpdateCategory();

  useEffect(() => {
    reset({
      ...data,
    });
  }, [data, reset]);

  const onSubmit = async (data: UpdateCategoryRequest) => {
    let res;
    if (isUpdating) res = await updateAsync(data);
    else res = await createAsync(data as CreateCategoryRequest);

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
    <CUForm<UpdateCategoryRequest>
      name={isUpdating ? "Cập nhật phân loại" : "Thêm phân loại"}
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
        <div className={"col-span-2"}>
          <Input
            defaultValue={data?.name ?? " "}
            {...register("name")}
            label={"Tên phân loại"}
          />
        </div>
      </div>
    </CUForm>
  );
}
