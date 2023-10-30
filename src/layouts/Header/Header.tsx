import { ReactElement } from "react";

interface HeaderProps {
  name: string;
}

export function Header({ name }: HeaderProps): ReactElement {
  return (
    <div className={"p-6 bg-white"}>
      <p className={"text-xl font-semibold"}>{name}</p>
    </div>
  );
}
