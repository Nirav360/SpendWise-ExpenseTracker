import { PieChart } from "@mui/x-charts/PieChart";

const ExpenseReport = () => {
  return (
    <>
      <div className="card-container">
        <div className="card-content">
          <h3>Expense by Category</h3>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "series A" },
                  { id: 1, value: 15, label: "series B" },
                  { id: 2, value: 20, label: "series C" },
                ],
              },
            ]}
            height={300}
          />
        </div>
      </div>
    </>
  );
};

export default ExpenseReport;
