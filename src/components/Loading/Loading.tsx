import { ReactElement } from "react";
import { Spinner } from "@nextui-org/react";

export function Loading(): ReactElement {
  return (
    <div>
      <Spinner size="lg" />
    </div>
  );
}
