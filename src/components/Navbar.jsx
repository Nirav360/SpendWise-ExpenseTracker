import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../services/commonApiSlice";
import Spinner from "./spinner/Spinner";
import { IconButton } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const Navbar = () => {
  const [logout, { isLoading, isSuccess, isError, error }] =
    useLogoutMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  if (isError) return <p>Error: {error.data?.message}</p>;
  return (
    <>
      {isLoading && <Spinner />}
      <nav className="navbar">
        <div className="navbar-brand">
          <NavLink to="/">
            <h2>SpendWise</h2>
          </NavLink>
        </div>
        <div className="navbar-items">
          <div className="navbar-center">
            <NavLink to="/">
              <h2>Expense Tracker</h2>
            </NavLink>
          </div>
          <div className="navbar-right">
            <NavLink to="/">
              <IconButton onClick={logout} color="primary">
                <LogoutRoundedIcon />
              </IconButton>
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
