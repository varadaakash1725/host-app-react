import { NavLink, Outlet } from "react-router-dom";
import "./DashboardLayout.css";

export default function DashboardLayout() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Dashboard</h2>

        <nav>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contacts">Contacts</NavLink>
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}