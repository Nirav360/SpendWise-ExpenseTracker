import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/login/LoginPage";
import LoginPersist from "./components/login/LoginPersist";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<LoginPage type={"login"} />} />
        <Route path="/register" element={<LoginPage type={"register"} />} />
        {/* <Route element={<ProtectedRoute />}> */}
        <Route element={<LoginPersist />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        {/* </Route> */}
      </Routes>
    </>
  );
}

export default App;
