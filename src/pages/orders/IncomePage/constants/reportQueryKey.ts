import {
  GetIncomeChartRequest,
  GetIncomeReportRequest,
} from "../../../../api/orders/requests/report";
import qs from "qs";

export const getIncomeReport = (request: GetIncomeReportRequest) =>
  "getIncomeReport" + qs.stringify(request);

export const getIncomeChart = (request: GetIncomeChartRequest) =>
  "getIncomeChart" + qs.stringify(request);
