import { Select, SelectItem, Skeleton } from "@nextui-org/react";
import { useState } from "react";
import {
  TimeRange,
  TimeRangeArray,
  TimeRangeLabel,
} from "../../../../../api/orders/models/enum";
import {
  axisClasses,
  BarPlot,
  ChartContainer,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  LinePlot,
  MarkPlot,
} from "@mui/x-charts";
import { useGetIncomeChart } from "../../hooks";
import { ChartsLegend } from "@mui/x-charts/ChartsLegend";

export function IncomeChart() {
  const [time, setTime] = useState<TimeRange>(TimeRange.Day);

  const { data, isLoading, isError } = useGetIncomeChart({ timeRange: time });

  return (
    <div className={"rounded-xl bg-white shadow p-4"}>
      <div className={"flex justify-end w-full"}>
        <Select
          className={"w-[150px]"}
          size={"sm"}
          color={"secondary"}
          defaultSelectedKeys={["0"]}
          aria-label={"Thời gian"}
          onChange={(e) => {
            setTime(
              TimeRangeArray[
                parseInt(e.target.value !== "-1" ? e.target.value : "0")
              ],
            );
          }}
          label={"Theo"}
          labelPlacement={"outside-left"}
          classNames={{ label: "text-md h-full block flex items-center" }}
        >
          {TimeRangeArray.map((item: TimeRange, index: number) => (
            <SelectItem
              key={index}
              value={item}
              textValue={TimeRangeLabel[index]}
              color={"primary"}
            >
              {TimeRangeLabel[index]}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div>
        <Skeleton
          className={"rounded-xl w-full h-[400px] mt-4 px-4"}
          isLoaded={!isLoading}
        >
          {!isLoading && !isError && (
            <ChartContainer
              height={400}
              width={1200}
              margin={{ left: 150, right: 150 }}
              sx={{
                [`.${axisClasses.left} .${axisClasses.label}`]: {
                  transform: "translate(-40px, 0)",
                },
                [`.${axisClasses.right} .${axisClasses.label}`]: {
                  transform: "translate(25px, 0)",
                },
              }}
              series={[
                {
                  type: "line",
                  data: data?.revenue?.map((p) => p.total),
                  valueFormatter: (value) => `${value.toLocaleString()} VND`,
                  yAxisKey: "revenue",
                  label: "Doanh thu",
                },
                {
                  type: "bar",
                  data: data?.orders?.map((p) => p.total),
                  valueFormatter: (value) => `${value.toLocaleString()} Đơn`,
                  yAxisKey: "orders",
                  label: "Đơn hàng",
                },
              ]}
              yAxis={[
                {
                  id: "revenue",
                  scaleType: "pow",
                  valueFormatter: (value) => `${value / 1000000} Triệu`,
                  label: "Doanh thu",
                },
                {
                  id: "orders",
                  scaleType: "linear",
                  label: "Đơn hàng",
                },
              ]}
              xAxis={[
                {
                  id: "time",
                  data: data?.xLabels,
                  scaleType: "band",
                },
              ]}
            >
              <LinePlot />
              <MarkPlot />
              <BarPlot />
              <ChartsLegend />
              <ChartsTooltip />
              <ChartsYAxis
                position={"left"}
                axisId={"revenue"}
                label={"Doanh thu"}
              />
              <ChartsYAxis
                position={"right"}
                axisId={"orders"}
                label={"Đơn hàng"}
              />
              <ChartsXAxis
                label={"Thời gian"}
                position={"bottom"}
                axisId={"time"}
              />
            </ChartContainer>
            // <LineChart
            //   xAxis={[{ scaleType: "point", data: data?.xLabels }]}
            //   series={[
            //     { data: data?.revenue.map((p) => p.total), label: "Doanh thu" },
            //   ]}
            //   className={"w-full h-[400px]"}
            //   height={400}
            //   margin={{ left: 100 }}
            //   sx={{
            //     ".MuiLineElement-root": {
            //       stroke: "#8884d8",
            //       strokeWidth: 2,
            //     },
            //     ".MuiMarkElement-root": {
            //       stroke: "#8884d8",
            //       scale: "0.6",
            //       fill: "#fff",
            //       strokeWidth: 2,
            //     },
            //   }}
            // />
          )}
        </Skeleton>
      </div>
    </div>
  );
}
