import { Status } from "../models/status.enum.ts";
import { BadgeProps } from "@nextui-org/react";

export function getStatusColor(status: Status): BadgeProps["color"] {
  switch (status) {
    case Status.Available:
      return "primary";
    case Status.Disable:
      return "warning";
    case Status.Delete:
      return "danger";
  }
}
