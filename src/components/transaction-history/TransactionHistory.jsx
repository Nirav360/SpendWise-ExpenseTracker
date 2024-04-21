/* eslint-disable react/prop-types */
import TransactionTile from "./TransactionTile";

const TransactionHistory = ({ data }) => {
  return (
    <>
      <div className="transaction-card">
        <div className="card-content">
          <h2 className="font-extrabold text-xl">Transaction History</h2>
          <div className="transaction">
            <main>
              {data.transactions.length > 0 ? (
                data.transactions.map((item) => (
                  <TransactionTile key={item._id} transactions={item} />
                ))
              ) : (
                <h1>No transactions</h1>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionHistory;
