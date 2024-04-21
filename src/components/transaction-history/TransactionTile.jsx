/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { numberToRupees } from "../../utils/numberConversion";
import dayjs from "dayjs";

const TransactionTile = ({ transactions }) => {
  const amount = useMemo(
    () => numberToRupees(transactions.amount),
    [transactions.amount]
  );
  const classToAdd =
    transactions.type === "income"
      ? "transaction_income"
      : "transaction_expense";

  const formattedDate = dayjs(transactions.date).format(
    "ddd MMM DD YYYY HH:mm:ss [GMT]Z [India Standard Time]"
  );

  return (
    <>
      <div className="transaction-item">
        <article>
          <p>{transactions.category}</p>
          <span className="desc">{transactions.description}</span>
        </article>
        <div className="transaction_date">
          <p>{formattedDate}</p>
        </div>
        <div className={`transaction_number ${classToAdd}`}>
          <p>
            {classToAdd === "transaction_income" ? "+" : "-"}
            {amount}
          </p>
        </div>
      </div>
    </>
  );
};

export default TransactionTile;
