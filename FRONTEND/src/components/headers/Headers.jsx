import React from "react";
import dogImage from "../../../img/canigatti_trap.png";

import "../headers/headers.css";
import Button from "../button/Button";
import { Link } from "react-router-dom";
const Headers = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div data-aos="fade-right" className="col-12 col-md-12 ">
            <div className="d-flex flex-column justify-content-center align-items-center mt-5">
              <h2 className="fs-1 heading text-center">
                Benvenuto in{" "}
                <span className="text-danger">
                  Animal<span className="brand-name">Ranch</span>{" "}
                </span>
                , <br />
                la piattaforma per i tuoi amici animali.
              </h2>
              <p className="text-muted">
                Il nostro obbiettivo è di dare una casa a ogni amico peloso
              </p>
            </div>
          </div>

          <div data-aos="fade-left" className="col-12 col-md-12">
            <div className="d-flex justify-content-center">
              <div className="position-relative mt-2 mb-4">
                <img className="img-fluid custom-img" src={dogImage} alt="" />

                <div className=" custom-btn-position d-none d-md-block ">
                  <Link to="/signup">
                    <Button variant="success" text="Iscriviti" />
                  </Link>
                </div>
                <div className="text-center mt-3 d-block d-md-none">
                  <Link to="/signup">
                    <Button variant="success" text="Iscriviti" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Headers;
