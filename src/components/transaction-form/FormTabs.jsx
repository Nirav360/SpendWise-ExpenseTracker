import { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import IncomeForm from "./IncomeForm";
import ExpenseForm from "./ExpenseForm";

function CustomTabPanel(props) {
  // eslint-disable-next-line react/prop-types
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div style={{ padding: "1rem" }}>
          <div>{children}</div>
        </div>
      )}
    </div>
  );
}

const FormTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Income" />
        <Tab label="Expense" />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <IncomeForm />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ExpenseForm />
      </CustomTabPanel>
    </div>
  );
};

export default FormTabs;
