import { TimeRange } from "../enum";

export interface ChartPoint {
  label: string;
  total: number;
}

export interface IncomeChart {
  revenue: ChartPoint[];
  orders: ChartPoint[];
  timeRange: TimeRange;
  xLabels: string[];
}
