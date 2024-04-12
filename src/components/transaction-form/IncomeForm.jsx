import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Clear } from "@mui/icons-material";

const initialValues = {
  category: "",
  amount: "",
  incomeDate: null,
};
const IncomeForm = () => {
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
    console.log(new Date(formDetails.incomeDate));
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
          <DatePicker
            label="Date"
            name="incomeDate"
            format="DD/MM/YYYY"
            value={formDetails.incomeDate}
            onChange={(newValue) =>
              setFormDetails((prev) => ({ ...prev, incomeDate: newValue }))
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

export default IncomeForm;
