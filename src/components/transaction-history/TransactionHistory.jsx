import { numberToRupees } from "../../utils/numberConversion";

const TransactionHistory = () => {
  const number = numberToRupees(20000);
  let type = "income";
  const classToAdd =
    type === "income" ? "transaction_income" : "transaction_expense";
  return (
    <>
      <div className="transaction-card">
        <div className="card-content">
          <h2>Transaction History</h2>
          <div className="transaction">
            <main>
              {/* {cartState.length > 0 && isSuccess ? (
            cartState.map((item) => <CartTile key={item._id} cartItem={item} />)
          ) : ( */}
              {/* <h1>No transactions</h1> */}
              {/* )} */}
              <div className="transaction-item">
                <article>
                  <p>Lorem ipsum dolor sit amet.</p>
                  <span className="desc">Lorem ipsum dolor sit amet.</span>
                </article>
                <div className="transaction_date">
                  <p>Wed Apr 17 2024 00:00:00 GMT+0530 (India Standard Time)</p>
                </div>
                <div className={`transaction_number ${classToAdd}`}>
                  <p>
                    {classToAdd === "transaction_income" ? "+" : "-"}
                    {number}
                  </p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionHistory;
