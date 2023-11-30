import { GetIncomeReportRequest } from "../../../../api/orders/requests/report";
import { useQuery } from "react-query";
import { reportQueryKey } from "../constants";
import { reportApi } from "../../../../api/orders";

export function useGetIncomeReport(request: GetIncomeReportRequest) {
  return useQuery(reportQueryKey.getIncomeReport(request), async () => {
    return await reportApi.getIncomeReport(request);
  });
}
