
import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export const Landing = () => {
  return (
    <div className="landing-container">
      <div className="overlay">
        <nav className="navbar">
          <h1 className="logo">TaskFlow</h1>

          <div className="nav-links">
            <Link to="/login" className="btn-outline">
              Login
            </Link>
            <Link to="/signup" className="btn-primary">
              Signup
            </Link>
          </div>
        </nav>

        <div className="hero">
          <h2>Organize Your Life, One Task at a Time</h2>
          <p>
            Stay productive, manage your daily tasks, and achieve your goals
            effortlessly with TaskFlow.
          </p>

          <div className="hero-buttons">
            <Link to="/sign-up" className="btn-primary large">
              Get Started
            </Link>
            <Link to="/login" className="btn-outline large">
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
