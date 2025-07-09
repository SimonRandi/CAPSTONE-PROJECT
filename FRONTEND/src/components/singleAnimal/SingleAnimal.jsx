import React from "react";
import "../singleAnimal/singleAnimal.css";
import Button from "../button/Button";

const SingleAnimal = ({ animal }) => {
  return (
    <>
      <div
        data-aos="zoom-in"
        className="col-12 col-md-4 d-md-flex col-lg-3 d-flex mt-3  "
      >
        <div className="card  rounded-5 overflow-hidden mb-4" s>
          <div>
            <img
              src={
                animal.image || "https://picsum.photos/400/250?text=No+Image"
              }
              className="card-img-top"
              alt={`Foto di ${animal.name}`}
            />
          </div>
          <div className="card-body">
            <h4 className="card-title fw-bold">{animal.name}</h4>
            <p className="text-muted mb-2">
              <span className="badge bg-info text-dark me-2">
                {animal.species}
              </span>
              <span className="badge bg-secondary me-2">{animal.breed}</span>
              <span className="badge bg-warning text-dark">{animal.race}</span>
            </p>
            <p className="card-text mb-3 text-truncate">{animal.bio}</p>

            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Età
                <span className="badge bg-primary rounded-pill">
                  {animal.age} anni
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Cibo
                <span className="badge bg-success rounded-pill">
                  {animal.food}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Vaccinato
                <span
                  className={`badge rounded-pill ${
                    animal.isVaccinated ? "bg-success" : "bg-danger"
                  }`}
                >
                  {animal.isVaccinated ? "Sì" : "No"}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Pedigree
                <span
                  className={`badge rounded-pill ${
                    animal.hasPedigree ? "bg-success" : "bg-danger"
                  }`}
                >
                  {animal.hasPedigree ? "Sì" : "No"}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Sterilizzato
                <span
                  className={`badge rounded-pill ${
                    animal.isSterilized ? "bg-success" : "bg-danger"
                  }`}
                >
                  {animal.isSterilized ? "Sì" : "No"}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Adottato
                <span
                  className={`badge rounded-pill ${
                    animal.isAdopted ? "bg-success" : "bg-danger"
                  }`}
                >
                  {animal.isAdopted ? "Sì" : "No"}
                </span>
              </li>
            </ul>

            <div className="d-flex justify-content-between">
              <a className="btn  flex-grow-1 me-2">
                <Button text="Adotta" variant="success" />
              </a>
              <a href="#" className="btn  flex-grow-1">
                <Button text="Scopri di più" variant="info" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleAnimal;
