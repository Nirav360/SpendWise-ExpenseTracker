import { PieChart } from "@mui/x-charts/PieChart";
import { useExpenseByCategoryQuery } from "../../services/commonApiSlice";
import Spinner from "../spinner/Spinner";
import { useEffect, useState } from "react";
import Toast from "../snackbar/Toast";

const ExpenseReport = () => {
  const { data, isError, isLoading, error, isSuccess } =
    useExpenseByCategoryQuery();

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
      <div className="card-container">
        <div className="card-content">
          <h3 className="font-extrabold">Expense by Category (in %)</h3>
          {isSuccess && (
            <PieChart
              series={[
                {
                  data: data.expenseByCategory,
                  innerRadius: 50,
                  cornerRadius: 5,
                  paddingAngle: 3,
                  outerRadius: 100,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              height={300}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ExpenseReport;
