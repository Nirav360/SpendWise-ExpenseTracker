import { numberToRupees } from "../../utils/numberConversion";
import "./balanceInfo.css";

const number = numberToRupees(20000);
const BalanceInfo = () => {
  return (
    <>
      <div className="card-container">
        <div className="card-content balance-wrapper">
          <div>
            <h4>Total Balance</h4>
            <p className="balance-number">{number}</p>
          </div>

          <div className="income_expense_wrapper">
            <div className="income">
              <p>Income</p>
              <h4>{number}</h4>
            </div>
            <div className="expense">
              <p>Expense</p>
              <h4>{number}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BalanceInfo;
