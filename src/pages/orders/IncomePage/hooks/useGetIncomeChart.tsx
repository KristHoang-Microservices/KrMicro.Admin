import { GetIncomeChartRequest } from "../../../../api/orders/requests/report";
import { useQuery } from "react-query";
import { reportQueryKey } from "../constants";
import { reportApi } from "../../../../api/orders";

export function useGetIncomeChart(request: GetIncomeChartRequest) {
  return useQuery(reportQueryKey.getIncomeChart(request), async () => {
    return await reportApi.getIncomeChart(request);
  });
}
