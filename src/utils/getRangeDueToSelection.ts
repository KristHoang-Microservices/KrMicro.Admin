import moment from "moment";

export function getRangeDueToSelection(selectedTime: string): {
  fromDate: string;
  toDate: string;
} {
  switch (selectedTime) {
    case "Tuần":
      return {
        fromDate: moment(new Date()).startOf("isoWeek").toISOString(),
        toDate: moment(new Date()).endOf("isoWeek").toISOString(),
      };
    case "Tháng":
      return {
        fromDate: moment(new Date()).startOf("month").toISOString(),
        toDate: moment(new Date()).endOf("month").toISOString(),
      };
    case "Năm":
      return {
        fromDate: moment(new Date()).startOf("year").toISOString(),
        toDate: moment(new Date()).endOf("year").toISOString(),
      };
    default:
      return {
        fromDate: moment(new Date()).toISOString(),
        toDate: moment(new Date()).toISOString(),
      };
  }
}
