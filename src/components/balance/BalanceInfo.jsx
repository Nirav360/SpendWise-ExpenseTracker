/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { numberToRupees } from "../../utils/numberConversion";
import "./balanceInfo.css";

const BalanceInfo = ({ data }) => {
  const totalBalance = useMemo(
    () => numberToRupees(data.totalBalance),
    [data.totalBalance]
  );

  const income = useMemo(
    () => numberToRupees(data.totalIncome),
    [data.totalIncome]
  );
  const expense = useMemo(
    () => numberToRupees(data.totalExpense),
    [data.totalExpense]
  );
  return (
    <>
      <div className="card-container">
        <div className="card-content balance-wrapper">
          <div>
            <h4 className="font-extrabold">Total Balance</h4>
            <p className="balance-number">{totalBalance}</p>
          </div>

          <div className="income_expense_wrapper">
            <div className="income">
              <p className="font-extrabold">Income</p>
              <h4 className="font-extrabold text-xl">{income}</h4>
            </div>
            <div className="expense">
              <p className="font-extrabold">Expense</p>
              <h4 className="font-extrabold text-xl">{expense}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BalanceInfo;
