export interface IncomeReport {
  fromDate: string;
  toDate: string;
  revenue: number;
  totalOrders: number;
  totalProducts: number;
  totalSignedCustomer: number;
  totalSuccessOrders: number;
  averagePerOrder: number;
}
