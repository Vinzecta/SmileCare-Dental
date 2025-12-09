import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="header">
      {/* Logo */}
      <Link to="/" className="logo-wrapper">
        <img src="Logo.png" alt="SmileCare Dental Logo" className="logo-image" />
      </Link>

      {/* Navigation */}    
      <nav className="nav-menu">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="#" className="nav-link">Find Doctor</Link>
        <Link to="/appointments" className="nav-link">Appointment</Link>
        <Link to="/services" className="nav-link">Services</Link>
        <Link to="#" className="nav-link">Prices</Link>
        <Link to="#" className="nav-link">About Us</Link>
        <Link to="#" className="nav-link">Contact Us</Link>
      </nav>

      {/* Auth Section */}
      <div className="auth-area">
        {isAuthenticated && user ? (
          <div className="user-profile" title={user.email}>
            <img src={user.avatarUrl} alt={`${user.name} avatar`} className="user-avatar" />
            <span className="user-name">{user.name}</span>
            <button type="button" className="logout-btn" onClick={logout}>
              Log out
            </button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-login">
              Login
            </Link>
            <Link to="/register" className="btn btn-register">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}