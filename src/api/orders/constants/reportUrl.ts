import { ordersBaseUrl } from "./ordersBaseUrl.ts";

const reportBaseUrl = (path: string) => ordersBaseUrl("/Report" + path);

export const INCOME_REPORT: string = reportBaseUrl("/TotalIncome");
export const INCOME_CHART: string = reportBaseUrl("/IncomeChart");
