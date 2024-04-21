import { Button, TextField, CircularProgress } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../services/commonApiSlice";
import Toast from "../snackbar/Toast";

const RegistrationForm = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [formDetails, setFormDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formDetails).unwrap();
      setFormDetails({ email: "", password: "", username: "" });
      setOpenSnackbar({
        open: true,
        message: response.message,
        severity: "success",
      });
    } catch (err) {
      setOpenSnackbar({
        open: true,
        message: err.data?.message ?? "No Server response",
        severity: "error",
      });
    }
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
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div>
            <TextField
              required
              type="text"
              label="Username"
              name="username"
              fullWidth
              autoComplete="username"
              onChange={handleChange}
              value={formDetails.username}
            />
          </div>
          <div>
            <TextField
              required
              type="text"
              label="Email"
              name="email"
              fullWidth
              autoComplete="email"
              onChange={handleChange}
              value={formDetails.email}
            />
          </div>
          <div>
            <TextField
              required
              type="password"
              label="Password"
              name="password"
              onChange={handleChange}
              fullWidth
              autoComplete="current-password"
              value={formDetails.password}
            />
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size="1.5rem" /> : "Save"}
            </Button>
          </div>
          <p className="text-center">
            Have an account?{" "}
            <Link to={"/"} className="font-extrabold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default RegistrationForm;
