import { ReactElement } from "react";
import { Select, SelectItem, SelectProps } from "@nextui-org/react";
import { PromoUnitArray } from "../../api/orders/models/enum";

interface PromoUnitSelectProps extends Partial<SelectProps<number>> {
  onSelected: (promoUnit?: number) => void;
  defaultValue?: number;
}

export function PromoUnitSelect({
  onSelected,
  defaultValue,
  ...rest
}: PromoUnitSelectProps): ReactElement {
  return (
    <Select
      {...rest}
      label={"Loại giảm giá"}
      placeholder={"Chọn loại giảm giá"}
      size={"md"}
      defaultSelectedKeys={[`${defaultValue}` ?? "0"]}
      onChange={(evt) => {
        onSelected(parseInt(evt.target.value));
      }}
    >
      {PromoUnitArray.map((promoUnit: string, index: number) => (
        <SelectItem key={index}>{promoUnit}</SelectItem>
      ))}
    </Select>
  );
}
