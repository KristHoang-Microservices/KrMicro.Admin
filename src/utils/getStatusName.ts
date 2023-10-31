import { Status } from "../models/status.enum.ts";

export function getStatusName(status: Status) {
  switch (status) {
    case Status.Available:
      return "Hoạt động";
    case Status.Disable:
      return "Dừng";
    case Status.Delete:
      return "Đã xóa";
  }
}
