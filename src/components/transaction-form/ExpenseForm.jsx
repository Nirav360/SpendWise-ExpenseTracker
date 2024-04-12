import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Clear } from "@mui/icons-material";

const initialValues = {
  category: "",
  description: "",
  amount: "",
  expenseDateTime: null,
};
const ExpenseForm = () => {
  const [formDetails, setFormDetails] = useState(initialValues);

  const handleChange = (e) => {
    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formDetails);
    console.log(new Date(formDetails.expenseDateTime));
  };

  const handleClear = () => {
    setFormDetails(initialValues);
  };

  return (
    <>
      <form className="income-expense-form" onSubmit={handleSubmit}>
        <TextField
          label="Category"
          name="category"
          type="text"
          variant="outlined"
          size="small"
          value={formDetails.category}
          onChange={handleChange}
          required
        />
        <TextField
          label="Description"
          name="description"
          type="text"
          variant="outlined"
          size="small"
          value={formDetails.description}
          onChange={handleChange}
          required
        />
        <TextField
          label="Amount"
          name="amount"
          type="number"
          variant="outlined"
          size="small"
          value={formDetails.amount}
          onChange={handleChange}
          required
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Expense Date"
            name="expenseDate"
            views={["year", "day", "hours", "minutes", "seconds"]}
            format="DD/MM/YYYY hh:mm:ss a"
            value={formDetails.expenseDateTime}
            onChange={(newValue) =>
              setFormDetails((prev) => ({ ...prev, expenseDateTime: newValue }))
            }
            slotProps={{ textField: { size: "small", required: true } }}
          />
        </LocalizationProvider>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
          <Button
            variant="outlined"
            type="reset"
            startIcon={<Clear />}
            color="error"
            onClick={handleClear}
          >
            Clear
          </Button>
        </div>
      </form>
    </>
  );
};

export default ExpenseForm;
