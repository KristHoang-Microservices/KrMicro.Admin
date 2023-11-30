import { IncomeChart } from "../../models/statistics";

export interface GetIncomeChartRequest extends Pick<IncomeChart, "timeRange"> {}
