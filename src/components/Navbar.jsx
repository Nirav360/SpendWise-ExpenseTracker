import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
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
            <NavLink to="/">Right Item</NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
