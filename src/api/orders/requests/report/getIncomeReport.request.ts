import { IncomeReport } from "../../models";

export interface GetIncomeReportRequest
  extends Pick<IncomeReport, "fromDate" | "toDate"> {}
