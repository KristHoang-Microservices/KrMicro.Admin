import { Promo } from "../../../../../api/orders/models";
import { CUForm } from "../../../../../components/CUForm";
import { useForm } from "react-hook-form";
import {
  CreatePromoRequest,
  UpdatePromoRequest,
} from "../../../../../api/orders/requests/promo";
import { Input, useDisclosure } from "@nextui-org/react";
import { useCreatePromo, useUpdatePromo } from "../../hooks/";
import { useEffect, useState } from "react";
import { CalendarModal } from "../../../../../components/CalendarModal";
import moment, { Moment } from "moment/moment";
import { PromoUnitSelect } from "../../../../../components/PromoUnitSelect";
import { PromoUnit } from "../../../../../api/orders/models/enum";

interface PromoFormProps {
  data?: Promo;
  isOpen: boolean;
  onClose: () => void;

  isUpdating: boolean;
  onOpenChange: (isOpen?: boolean) => void;
}

export function PromoFormModal({
  data,
  isOpen,
  onClose,
  onOpenChange,
  isUpdating,
}: PromoFormProps) {
  const { register, handleSubmit, reset, setValue } =
    useForm<UpdatePromoRequest>({
      defaultValues: {
        name: data?.name,
        code: data?.code,
        startDate: data?.startDate,
        endDate: data?.endDate,
        value: data?.value,
        promoUnit: data?.promoUnit,
      },
    });

  const {
    isOpen: CalendarFromDateFormIsOpen,
    onOpenChange: CalendarFromDateFormOnOpenChange,
  } = useDisclosure();

  const {
    isOpen: CalendarToDateFormIsOpen,
    onOpenChange: CalendarToDateFormOnOpenChange,
  } = useDisclosure();

  const [promoTime, setPromoTime] = useState<{
    startDate?: Moment;
    endDate?: Moment;
  }>({
    startDate:
      data?.startDate !== undefined ? moment(data?.startDate) : undefined,
    endDate: data?.endDate != undefined ? moment(data?.endDate) : undefined,
  });

  const { mutateAsync: createAsync, isLoading: createLoading } =
    useCreatePromo();
  const { mutateAsync: updateAsync, isLoading: updateLoading } =
    useUpdatePromo();

  useEffect(() => {
    reset({
      ...data,
    });
  }, [data, reset]);

  const onSubmit = async (data: UpdatePromoRequest) => {
    let res;
    if (data.promoUnit === PromoUnit.Percent)
      data.value = (data.value ?? 0) / 100;

    data.startDate = promoTime.startDate?.utc(false).toISOString();
    data.endDate = promoTime.endDate?.utc(false).toISOString();
    if (isUpdating) res = await updateAsync(data);
    else res = await createAsync(data as CreatePromoRequest);

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
      code: "",
      startDate: "",
      endDate: "",
      value: 0,
      promoUnit: undefined,
    });
  };

  return (
    <CUForm<UpdatePromoRequest>
      name={isUpdating ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
      isOpen={isOpen}
      isUpdating={isUpdating}
      onClose={closeEndReset}
      onOpenChange={onOpenChange}
      isLoading={createLoading || updateLoading}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      onReset={() => onClear()}
    >
      <div className={"flex flex-col gap-2"}>
        <div className={"grid grid-cols-2 gap-2 col-span-1"}>
          <div className={"col-span-2"}>
            <Input
              defaultValue={data?.name ?? ""}
              {...register("name")}
              label={"Tên giảm giá"}
            />
          </div>
          <div className={"col-span-2"}>
            <Input
              defaultValue={data?.code ?? ""}
              {...register("code")}
              label={"Mã giảm giá"}
            />
          </div>
          <div className={"col-span-1"}>
            <Input
              defaultValue={((data?.value ?? 0) * 100).toString() ?? ""}
              {...register("value")}
              label={"Giá trị"}
            />
          </div>
          <div className={"col-span-1"}>
            <PromoUnitSelect
              onSelected={(val) => {
                setValue("promoUnit", val);
              }}
              defaultValue={data?.promoUnit ?? 0}
            />
          </div>
          <div className={"col-span-1"}>
            <Input
              {...register("startDate")}
              label={"Ngày bắt đầu"}
              placeholder={"Chọn ngày bắt đầu"}
              onClick={CalendarFromDateFormOnOpenChange}
              value={promoTime.startDate?.utcOffset(7).format("DD/MM/yyyy")}
              isClearable={true}
              isReadOnly={true}
              onClear={() =>
                setPromoTime((prev) => ({ ...prev, startDate: undefined }))
              }
            />
          </div>
          <div className={"col-span-1"}>
            <Input
              {...register("endDate")}
              label={"Ngày kết thúc"}
              placeholder={"Chọn ngày kết thúc"}
              onClick={CalendarToDateFormOnOpenChange}
              value={promoTime.endDate?.utcOffset(7).format("DD/MM/yyyy")}
              isClearable={true}
              isReadOnly={true}
              onClear={() =>
                setPromoTime((prev) => ({ ...prev, endDate: undefined }))
              }
            />
          </div>
        </div>

        <CalendarModal
          isOpen={CalendarFromDateFormIsOpen}
          onOpenChange={CalendarFromDateFormOnOpenChange}
          onSubmit={(date: Moment) =>
            setPromoTime((prev) => ({
              ...prev,
              startDate: date.startOf("day"),
            }))
          }
          maxDate={moment(promoTime.endDate)}
          minDate={moment(new Date())}
        />

        <CalendarModal
          isOpen={CalendarToDateFormIsOpen}
          onOpenChange={CalendarToDateFormOnOpenChange}
          onSubmit={(date: Moment) =>
            setPromoTime((prev) => ({
              ...prev,
              endDate: date.endOf("day"),
            }))
          }
          minDate={
            data?.startDate != undefined
              ? moment(data.startDate)
              : moment(new Date())
          }
        />
      </div>
    </CUForm>
  );
}
