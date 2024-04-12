import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";

const chartSetting = {
  yAxis: [
    {
      label: "rainfall (mm)",
    },
  ],
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-10px, 0)",
      fontWeight: "bolder",
    },
  },
};
const dataset = [
  {
    income: 59,
    expense: 57,
    month: "Jan",
  },
  {
    income: 50,
    expense: 52,
    month: "Feb",
  },
  {
    income: 47,
    expense: 53,
    month: "Mar",
  },
  {
    income: 54,
    expense: 56,
    month: "Apr",
  },
  {
    income: 57,
    expense: 69,
    month: "May",
  },
  {
    income: 60,
    expense: 63,
    month: "June",
  },
  {
    income: 59,
    expense: 60,
    month: "July",
  },
  {
    income: 65,
    expense: 60,
    month: "Aug",
  },
  {
    income: 51,
    expense: 51,
    month: "Sept",
  },
  {
    income: 60,
    expense: 65,
    month: "Oct",
  },
  {
    income: 67,
    expense: 64,
    month: "Nov",
  },
  {
    income: 61,
    expense: 70,
    month: "Dec",
  },
];

const valueFormatter = (value) => `${value}mm`;
const TotalTransactionsReport = () => {
  return (
    <>
      <div className="card-container">
        <div className="card-content">
          <main>
            <h3>Total Transactions</h3>
            <BarChart
              height={300}
              dataset={dataset}
              xAxis={[{ scaleType: "band", dataKey: "month" }]}
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
              {...chartSetting}
            />
          </main>
        </div>
      </div>
    </>
  );
};

export default TotalTransactionsReport;
