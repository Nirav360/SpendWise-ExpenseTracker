import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currentToken } from "../../slice/authSlice";
import { useRefreshMutation } from "../../services/commonApiSlice";
import Spinner from "../spinner/Spinner";
import Toast from "../snackbar/Toast";
import { Outlet } from "react-router-dom";

const LoginPersist = () => {
  const token = useSelector(currentToken);

  const [trueSuccess, setTrueSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const [refresh, { isLoading, isUninitialized, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
        setTrueSuccess(true);
      } catch (err) {
        console.error(err);
      }
    };

    if (!token) verifyRefreshToken();

    // eslint-disable-next-line
  }, []);

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
      {(isSuccess && trueSuccess) || (isUninitialized && token) ? (
        <Outlet />
      ) : null}
    </>
  );
};
export default LoginPersist;
