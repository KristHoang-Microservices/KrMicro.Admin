import { Chip } from "@nextui-org/react";
import { PromoUnit, PromoUnitArray } from "../../api/orders/models/enum";
import { HiGiftTop, HiReceiptPercent } from "react-icons/hi2";

export function PromoUnitRender({ promoUnit }: { promoUnit: PromoUnit }) {
  return (
    <Chip
      endContent={
        promoUnit === PromoUnit.Percent ? <HiReceiptPercent /> : <HiGiftTop />
      }
      variant="flat"
      color={promoUnit === PromoUnit.Raw ? "success" : "secondary"}
    >
      {PromoUnitArray[promoUnit]}
    </Chip>
  );
}
