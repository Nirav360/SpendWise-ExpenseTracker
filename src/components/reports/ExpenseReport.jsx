import { PieChart } from "@mui/x-charts/PieChart";
import { useExpenseByCategoryQuery } from "../../services/commonApiSlice";
import Spinner from "../spinner/Spinner";
import { useEffect, useState } from "react";
import Toast from "../snackbar/Toast";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const ExpenseReport = () => {
  const [selectedYear, setSelectedYear] = useState(dayjs(new Date()));
  const { data, isError, isLoading, error, isSuccess } =
    useExpenseByCategoryQuery(selectedYear.year());
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
          <h3 className="font-extrabold text-xl mb-4">
            Expense by Category (in %)
          </h3>
          <div className="flex flex-col">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Year"
                name="year"
                views={["year"]}
                disableFuture
                value={selectedYear}
                onChange={(newValue) => setSelectedYear(newValue)}
                slotProps={{ textField: { size: "small", required: true } }}
              />
            </LocalizationProvider>
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
      </div>
    </>
  );
};

export default ExpenseReport;
