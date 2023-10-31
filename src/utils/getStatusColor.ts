import { Status } from "../models/status.enum.ts";

export function getStatusColor(status: Status) {
  switch (status) {
    case Status.Available:
      return "primary";
    case Status.Disable:
      return "warning";
    case Status.Delete:
      return "danger";
  }
}
