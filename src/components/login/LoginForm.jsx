import { Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../../slice/authSlice";
import { useLoginMutation } from "../../services/commonApiSlice";
import Toast from "../snackbar/Toast";

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    message: "",
  });
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      const response = await login(formDetails).unwrap();
      dispatch(setToken({ accessToken: response.accessToken }));
      setFormDetails({ email: "", password: "" });
      navigate("/dashboard");
    } catch (err) {
      setOpenSnackbar({
        open: true,
        message: err?.data?.message ?? "No Server response",
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
        severity={"error"}
      />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
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
              size="small"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size="1.5rem" /> : "Submit"}
            </Button>
          </div>
          <p className="text-center">
            Don&apos;t have an account?
            <Link to={"register"} className="font-extrabold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
