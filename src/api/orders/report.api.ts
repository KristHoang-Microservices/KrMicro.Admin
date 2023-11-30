import { BaseApi } from "../common/baseApi.api.ts";
import { reportUrl } from "./constants";
import qs from "qs";
import {
  GetIncomeChartRequest,
  GetIncomeReportRequest,
} from "./requests/report";
import { GetIncomeReportResponse } from "./responses/report";
import { IncomeChart } from "./models/statistics";

class ReportApi extends BaseApi {
  async getIncomeReport(
    request?: GetIncomeReportRequest,
  ): Promise<GetIncomeReportResponse | null> {
    return await this.tryGet<GetIncomeReportResponse>(
      reportUrl.INCOME_REPORT,
      undefined,
      {
        params: request,
        paramsSerializer: (params) => qs.stringify(params),
      },
    );
  }

  async getIncomeChart(
    request?: GetIncomeChartRequest,
  ): Promise<IncomeChart | null> {
    return await this.tryGet<IncomeChart>(reportUrl.INCOME_CHART, undefined, {
      params: request,
      paramsSerializer: (params) => qs.stringify(params),
    });
  }
}

export const reportApi: ReportApi = new ReportApi();
