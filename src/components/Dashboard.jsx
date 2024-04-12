import BalanceInfo from "./balance/BalanceInfo";
import ExpenseReport from "./reports/ExpenseReport";
import Navbar from "./Navbar";
import TotalTransactionsReport from "./reports/TotalTransactionsReport";
import TransactionHistory from "./transaction-history/TransactionHistory";
import MainContainer from "./transaction-form/MainContainer";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="grid-container">
        <MainContainer />
        <BalanceInfo />
      </div>
      <div className="transaction-container">
        <TransactionHistory />
      </div>
      <div className="grid-container">
        <ExpenseReport />
        <TotalTransactionsReport />
      </div>
    </>
  );
};

export default Dashboard;
