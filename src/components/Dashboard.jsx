import BalanceInfo from "./balance/BalanceInfo";
import ExpenseReport from "./reports/ExpenseReport";
import Navbar from "./Navbar";
import TotalTransactionsReport from "./reports/TotalTransactionsReport";
import TransactionHistory from "./transaction-history/TransactionHistory";
import MainContainer from "./transaction-form/MainContainer";
import { useGetTransactionsQuery } from "../services/commonApiSlice";
import Spinner from "./spinner/Spinner";
import { useEffect, useState } from "react";
import Toast from "./snackbar/Toast";

const Dashboard = () => {
  const { data, isLoading, isError, error, isSuccess } =
    useGetTransactionsQuery();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isError) return setOpen(true);
  }, [isError]);

  return (
    <>
      {isLoading && <Spinner />}
      <Toast
        open={open}
        handleClose={() => setOpen(false)}
        message={error?.data?.message ?? "No server response"}
        severity={"error"}
      />
      <Navbar />
      <div className="grid-container">
        <MainContainer />
        {isSuccess && <BalanceInfo data={data.transactionDetails} />}
      </div>
      {isSuccess && (
        <>
          <div className="transaction-container">
            <TransactionHistory data={data.transactionDetails} />
          </div>
          <div className="grid-container">
            <ExpenseReport />
            <TotalTransactionsReport />
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
