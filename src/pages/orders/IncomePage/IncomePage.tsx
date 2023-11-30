import { ReactElement } from "react";
import { TransactionTable } from "./components/TransactionTable";
import { IncomeReview } from "./components/IncomeReview";
import { IncomeChart } from "./components/IncomeChart";

export function IncomePage(): ReactElement {
  // const {
  //   data: transactions,
  //   isLoading: loadingList,
  //   isFetching,
  // } = useGetTransactions(transactionsRequest);

  return (
    <div className={"flex flex-col gap-4"}>
      <IncomeReview />
      <IncomeChart />
      <TransactionTable />
    </div>
  );
}
