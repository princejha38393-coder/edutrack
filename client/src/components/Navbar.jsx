import { BookOpen, LayoutDashboard, LogOut, Menu, Moon, Search, ShieldCheck, Sun, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import { useTheme } from "../state/ThemeContext.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  const links = (
    <>
      <NavLink to="/courses">Courses</NavLink>
      {user && <NavLink to="/dashboard">Dashboard</NavLink>}
      {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
    </>
  );

  return (
    <header className="navbar">
      <Link to="/" className="brand" aria-label="EDUTRACK home">
        <span className="brand-mark"><BookOpen size={22} /></span>
        <span>EDUTRACK</span>
      </Link>
      <nav className="nav-links">{links}</nav>
      <div className="nav-search">
        <Search size={18} />
        <input placeholder="Search courses" aria-label="Search courses" />
      </div>
      <div className="nav-actions">
        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        {user ? (
          <>
            <button className="ghost-btn" onClick={() => navigate(user.role === "admin" ? "/admin" : "/dashboard")}>
              {user.role === "admin" ? <ShieldCheck size={18} /> : <LayoutDashboard size={18} />}
              {user.name.split(" ")[0]}
            </button>
            <button className="icon-btn" onClick={handleLogout} aria-label="Sign out"><LogOut size={18} /></button>
          </>
        ) : (
          <>
            <Link className="ghost-btn" to="/login">Login</Link>
            <Link className="primary-btn small" to="/register">Join now</Link>
          </>
        )}
      </div>
      <button className="icon-btn mobile-menu" onClick={() => setOpen((value) => !value)} aria-label="Open menu">
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <div className="mobile-panel" onClick={() => setOpen(false)}>
          {links}
          {user ? <button onClick={handleLogout}>Sign out</button> : <Link to="/login">Login</Link>}
        </div>
      )}
    </header>
  );
}
