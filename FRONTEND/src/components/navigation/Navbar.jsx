import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-success d-flex justify-content-between align-items-center border-0">
        <div className="container position-relative">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link
            className="text-decoration-none navbar-brand fs-1  mx-auto navbar-center-logo fw-bold text-danger"
            to="/"
          >
            🐶 Animal<span className="text-warning">Ranch</span>🐱
          </Link>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ms-auto d-flex gap-4">
              <li className="nav-item  fs-4 ">
                <Link to="/" className="text-decoration-none text-white">
                  Home
                </Link>
              </li>
              <li className="nav-item  fs-4">
                <Link
                  to="/about-us"
                  className="text-decoration-none text-white"
                >
                  Chi Sono
                </Link>
              </li>

              <li className="nav-item ms-0">
                <Link
                  className="text-decoration-none text-white fs-4"
                  to="/signup"
                  onClick={() => console.log("navigation to signup")}
                >
                  Iscriviti
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="text-decoration-none text-white fs-4"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
