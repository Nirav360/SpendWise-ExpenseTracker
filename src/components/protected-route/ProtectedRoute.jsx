import { Outlet, useLocation, Navigate } from "react-router-dom";
import { currentToken } from "../../slice/authSlice";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const location = useLocation();
  const token = useSelector(currentToken);

  const content = token ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );

  return content;
};

export default ProtectedRoute;
