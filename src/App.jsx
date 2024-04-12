import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
