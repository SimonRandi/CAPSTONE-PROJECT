import React from "react";
import "../actionBar/actionBar.css";
import { Link } from "react-router-dom";

const ActionBar = () => {
  return (
    <>
      <div className=" dropdown d-flex justify-content-center gap-5 bg-success p-2 ">
        <a
          className="nav-link dropdown-toggle text-decoration-none text-white"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Cani
        </a>
        <ul className="dropdown-menu custom-dropdown text-center">
          <li>
            <Link className="text-decoration-none text-white" to="/dogs">
              Tutti i cani
            </Link>
          </li>
          <li>
            <Link className="text-decoration-none text-white" to="/dogs/race">
              Razza
            </Link>
          </li>
          <li>
            <Link className="text-decoration-none text-white" to="/dogs/breed">
              Taglia
            </Link>
          </li>
          <li>
            <Link className="text-decoration-none text-white" to="/dogs/age">
              Età
            </Link>
          </li>
        </ul>
        <a
          className="nav-link dropdown-toggle text-decoration-none text-white"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Gatti
        </a>
        <ul className="dropdown-menu custom-dropdown text-center">
          <li>
            <Link className="text-decoration-none text-white" to="/cats">
              Tutti i Gatti
            </Link>
          </li>
          <li>
            <Link className="text-decoration-none text-white" to="/cats/race">
              Razza
            </Link>
          </li>

          <li>
            <Link className="text-decoration-none text-white" to="/cats/age">
              Eta
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ActionBar;
