import { BarChart } from "@mui/x-charts/BarChart";
import { useTransactionsByMonthQuery } from "../../services/commonApiSlice";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import Toast from "../snackbar/Toast";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// const dataset = [
//   {
//     income: 59,
//     expense: 57,
//     month: "Jan",
//   },
//   {
//     income: 50,
//     expense: 52,
//     month: "Feb",
//   },
//   {
//     income: 47,
//     expense: 53,
//     month: "Mar",
//   },
//   {
//     income: 54,
//     expense: 56,
//     month: "Apr",
//   },
//   {
//     income: 57,
//     expense: 69,
//     month: "May",
//   },
//   {
//     income: 60,
//     expense: 63,
//     month: "June",
//   },
//   {
//     income: 59,
//     expense: 60,
//     month: "July",
//   },
//   {
//     income: 65,
//     expense: 60,
//     month: "Aug",
//   },
//   {
//     income: 51,
//     expense: 51,
//     month: "Sept",
//   },
//   {
//     income: 60,
//     expense: 65,
//     month: "Oct",
//   },
//   {
//     income: 67,
//     expense: 64,
//     month: "Nov",
//   },
//   {
//     income: 61,
//     expense: 70,
//     month: "Dec",
//   },
// ];

const valueFormatter = (value) => `Rs ${value}`;
const TotalTransactionsReport = () => {
  const [selectedYear, setSelectedYear] = useState(dayjs(new Date()));

  const { data, isError, isLoading, error, isSuccess } =
    useTransactionsByMonthQuery(selectedYear.year());

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
          <main>
            <h3 className="font-extrabold text-xl mb-4">Total Transactions</h3>
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
                <BarChart
                  height={300}
                  dataset={data.transactionsByMonth}
                  xAxis={[
                    {
                      scaleType: "band",
                      dataKey: "month",
                      tickPlacement: "middle",
                    },
                  ]}
                  series={[
                    {
                      dataKey: "income",
                      label: "Income",
                      valueFormatter,
                      color: "green",
                    },
                    {
                      dataKey: "expense",
                      label: "Expense",
                      valueFormatter,
                      color: "red",
                    },
                  ]}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default TotalTransactionsReport;
