import { useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Clear } from "@mui/icons-material";
import { useAddIncomeMutation } from "../../services/commonApiSlice";
import Toast from "../snackbar/Toast";

const initialValues = {
  category: "",
  amount: "",
  date: null,
};
const IncomeForm = () => {
  const [formDetails, setFormDetails] = useState(initialValues);
  const [addIncome, { isLoading }] = useAddIncomeMutation();
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formDetails,
      date: new Date(formDetails.date),
      type: "income",
    };
    try {
      const response = await addIncome(payload).unwrap();
      if (response.success) {
        setOpenSnackbar({
          open: true,
          message: response.message,
          severity: "success",
        });
        handleClear();
      }
    } catch (err) {
      setOpenSnackbar({
        open: true,
        message: err?.data?.message ?? "No Server response",
        severity: "error",
      });
    }
  };

  const handleClear = () => {
    setFormDetails(initialValues);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar((prev) => ({ ...prev, open: false }));
  };
  return (
    <>
      <Toast
        open={openSnackbar.open}
        handleClose={handleCloseSnackbar}
        message={openSnackbar.message}
        severity={openSnackbar.severity}
      />
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
            name="date"
            format="DD/MM/YYYY"
            value={formDetails.date}
            onChange={(newValue) =>
              setFormDetails((prev) => ({ ...prev, date: newValue }))
            }
            slotProps={{ textField: { size: "small", required: true } }}
          />
        </LocalizationProvider>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Button variant="contained" type="submit" disabled={isLoading}>
            {isLoading ? <CircularProgress size="1.5rem" /> : "Submit"}
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
