import { useGetIncomeReport } from "../../hooks";
import { useState } from "react";
import { GetIncomeReportRequest } from "../../../../../api/orders/requests/report";
import moment from "moment";
import {
  Card,
  CardFooter,
  CardHeader,
  Image,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { timeRange } from "../../../../../constants";
import { getRangeDueToSelection } from "../../../../../utils/getRangeDueToSelection.ts";
import { FaDotCircle } from "react-icons/fa";

export function IncomeReview() {
  const [time, setTime] = useState<GetIncomeReportRequest>({
    fromDate: moment(new Date()).toISOString(true),
    toDate: moment(new Date()).toISOString(true),
  });
  const { data } = useGetIncomeReport(time);
  return (
    <>
      <div className={"flex gap-4 items-center mb-4"}>
        <p className={"font-semibold text-lg"}>Báo cáo</p>
        <Select
          className={"w-[100px]"}
          size={"sm"}
          color={"primary"}
          defaultSelectedKeys={["0"]}
          aria-label={"Thời gian"}
          onChange={(e) => {
            setTime(
              getRangeDueToSelection(timeRange[parseInt(e.target.value)]),
            );
          }}
        >
          {timeRange.map((item: string, index: number) => (
            <SelectItem
              key={index}
              value={item}
              textValue={item}
              color={"primary"}
            >
              {item}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className={"w-full grid grid-cols-4 gap-4 h-[200px]"}>
        <Card isPressable={true} isBlurred={true}>
          <CardHeader className={"absolute z-10 top-1 flex-col !items-start"}>
            <div
              className={"text-white font-semibold uppercase flex items-center"}
            >
              <FaDotCircle className={"text-green-400 mr-2 inline"} />
              Tổng doanh thu
            </div>
            <p className={"text-3xl text-green-200 font-bold"}>
              {data?.revenue.toLocaleString()} VND
            </p>
          </CardHeader>
          <Image
            src={
              "https://images.unsplash.com/photo-1619359059287-9d024d7081ef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={"Income"}
            className={"z-0 w-full h-full object-cover"}
            removeWrapper={true}
          />
        </Card>
        <Card isPressable={true} isBlurred={true}>
          <CardHeader className={"absolute z-10 top-1 flex-col !items-start"}>
            <div
              className={"text-white font-semibold uppercase flex items-center"}
            >
              <FaDotCircle className={"text-lime-500 mr-2 inline"} />
              Tổng sản phẩm
            </div>
            <p className={"text-3xl text-lime-200 font-bold"}>
              {data?.totalProducts} Sản phẩm
            </p>
          </CardHeader>
          <Image
            src={
              "https://images.unsplash.com/photo-1555448248-2571daf6344b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={"Income"}
            className={"z-0 w-full h-full object-cover"}
            removeWrapper={true}
          />
        </Card>
        <Card
          isPressable={true}
          isBlurred={true}
          isFooterBlurred={true}
          radius="lg"
        >
          <CardHeader className={"absolute z-10 top-1 flex-col !items-start"}>
            <div
              className={
                "text-gray-100 font-semibold uppercase flex items-center"
              }
            >
              <FaDotCircle className={"mr-2 inline"} />
              Tổng số đơn
            </div>
            <p className={"text-4xl text-white font-bold"}>
              {data?.totalOrders} Đơn
            </p>
          </CardHeader>
          <Image
            src={
              "https://images.unsplash.com/photo-1619779854918-013a8e70452a?q=80&w=2140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={"Income"}
            className={"z-0 w-full h-full object-cover"}
            removeWrapper={true}
          />
          <CardFooter
            className={
              "justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-3 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10"
            }
          >
            <div className={"flex gap-1 text-white "}>
              Với
              <p className={"text-secondary-200 font-bold"}>
                {data?.totalSuccessOrders} đơn
              </p>{" "}
              thành công
            </div>
          </CardFooter>
        </Card>
        <Card isPressable={true} isBlurred={true} isFooterBlurred={true}>
          <CardHeader className={"absolute z-10 top-1 flex-col !items-start"}>
            <div
              className={"text-white font-semibold uppercase flex items-center"}
            >
              <FaDotCircle className={"text-lime-500 mr-2 inline"} />
              Giá trị trung bình
            </div>
            <p className={"text-2xl text-amber-100 font-bold text-left"}>
              {data?.averagePerOrder.toLocaleString()} VND / Đơn hàng
            </p>
          </CardHeader>
          <Image
            src={
              "https://images.unsplash.com/photo-1604852769974-7323d39bf9e1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={"Income"}
            className={"z-0 w-full h-full object-cover"}
            removeWrapper={true}
          />
          <CardFooter
            className={
              "justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-3 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10"
            }
          >
            <div className={"flex gap-1 text-white "}>
              Trên tổng
              <p className={"text-secondary-200 font-bold"}>
                {data?.totalSuccessOrders} đơn
              </p>{" "}
              thành công
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
