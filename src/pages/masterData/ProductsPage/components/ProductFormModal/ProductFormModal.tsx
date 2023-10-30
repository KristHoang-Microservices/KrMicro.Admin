import { Product } from "../../../../../api/masterData/models";
import { CUForm } from "../../../../../components/CUFrom";
import { useForm } from "react-hook-form";
import { CreateProductRequest } from "../../../../../api/masterData/requests/product";
import { Image, Input, Textarea } from "@nextui-org/react";
import { useCreateProduct } from "../../hooks/";
import { useEffect } from "react";

interface ProductFormProps {
  data?: Product;
  isOpen: boolean;
  onClose: () => void;

  isUpdating: boolean;
  onOpenChange: (isOpen?: boolean) => void;
}

export function ProductFormModal({
  data,
  isOpen,
  onClose,
  onOpenChange,
  isUpdating,
}: ProductFormProps) {
  const { register, handleSubmit, reset, watch } =
    useForm<CreateProductRequest>({
      defaultValues: {
        description: data?.description,
        name: data?.name,
        brandName: data?.brand.name,
        categoryName: data?.category.name,
        importFrom: data?.importFrom,
        releaseYear: data?.releaseYear,
        fragranceDescription: data?.fragranceDescription,
        style: data?.style,
        imageUrls: data?.imageUrls,
      },
    });

  const { mutateAsync: createAsync, isLoading: createLoading } =
    useCreateProduct();

  useEffect(() => {
    reset({
      ...data,
      brandName: data?.brand.name,
      categoryName: data?.category.name,
    });
  }, [data, reset]);

  const onSubmit = async (data: CreateProductRequest) => {
    const res = await createAsync(data);
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
      description: "",
      name: "",
      brandName: "",
      categoryName: "",
      importFrom: "",
      releaseYear: "",
      fragranceDescription: "",
      style: "",
      imageUrls: "",
    });
  };

  return (
    <CUForm<CreateProductRequest>
      name={isUpdating ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
      isOpen={isOpen}
      isUpdating={isUpdating}
      onClose={closeEndReset}
      onOpenChange={onOpenChange}
      isLoading={createLoading}
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
              label={"Tên sản phẩm"}
            />
          </div>
          <div className={"col-span-1"}>
            <Input
              defaultValue={data?.brand.name ?? " "}
              {...register("brandName")}
              label={"Tên nhãn hàng"}
            />
          </div>
          <div className={"col-span-1"}>
            <Input
              defaultValue={data?.category.name ?? " "}
              {...register("categoryName")}
              label={"Tên category"}
            />
          </div>
          <div className={"col-span-1"}>
            <Input
              defaultValue={data?.importFrom ?? " "}
              {...register("importFrom")}
              label={"Nhập từ"}
            />
          </div>
          <div className={"col-span-1"}>
            <Input
              {...register("releaseYear")}
              defaultValue={data?.releaseYear ?? " "}
              label={"Năm phát hành"}
            />
          </div>
          <div className={"col-span-2"}>
            <Input
              defaultValue={data?.fragranceDescription ?? " "}
              {...register("fragranceDescription")}
              label={"Mô tả hương"}
            />
          </div>
          <div className={"col-span-2"}>
            <Input
              defaultValue={data?.style ?? " "}
              {...register("style")}
              label={"Phong cách"}
            />
          </div>
          <div className={"col-span-2"}>
            <Input
              defaultValue={data?.imageUrls ?? " "}
              {...register("imageUrls")}
              label={"URL ảnh (Tạm)"}
            />
          </div>
        </div>
        <div className={"flex flex-col gap-2 col-span-1 relative"}>
          <Image
            src={watch("imageUrls")}
            isLoading={watch("imageUrls") === undefined}
            className={"w-full object-cover"}
          />
          <div className={"col-span-2"}>
            <Textarea
              defaultValue={data?.description ?? " "}
              {...register("description")}
              label={"Mô tả"}
            />
          </div>
        </div>
      </div>
    </CUForm>
  );
}
