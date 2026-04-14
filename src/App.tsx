import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { AppointmentsPage } from "./pages/AppointmentsPage";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <header className="top-nav">
        <div className="brand">Styling Hub</div>
        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/recept"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Appointments
          </NavLink>
        </nav>
      </header>

      <main className="content-wrap">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/recept" element={<AppointmentsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
