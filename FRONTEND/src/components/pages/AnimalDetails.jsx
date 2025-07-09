import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BaseLayout from "../layout/BaseLayout";
import "./animalDetails.css";
import AnimalGallery from "../animalGallery/AnimalGallery";
import LoginDetailPageModal from "./login/LoginDetailPageModal";

const AnimalDetails = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const getAnimal = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/animals/${id}`
      );
      const data = await response.json();
      setAnimal(data.animal);
    } catch (error) {
      console.error("errore nel caricamento", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);

    getAnimal();

    const contactPending = localStorage.getItem("showContactAfterLogin");
    if (contactPending === "true" && token) {
      setShowModal(true);
      localStorage.removeItem("showContactAfterLogin");
    }
  }, [id]);

  const handleShowContact = () => {
    if (isAuthenticated) {
      setShowModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  if (isLoading)
    return (
      <BaseLayout>
        <p className="text-center mt-4">Caricamento...</p>
      </BaseLayout>
    );
  if (!animal)
    return (
      <BaseLayout>
        <p className="text-center mt-4">Animale non trovato.</p>
      </BaseLayout>
    );

  return (
    <BaseLayout>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12 mb-5">
            <AnimalGallery images={animal.image} />
          </div>

          <div className="col-md-12">
            <h2 className="mb-3 text-center">{animal.name}</h2>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Specie:</strong> {animal.species}
              </li>
              <li className="list-group-item">
                <strong>Razza:</strong> {animal.race}
              </li>
              <li className="list-group-item">
                <strong>Taglia:</strong> {animal.breed}
              </li>
              <li className="list-group-item">
                <strong>Età:</strong> {animal.age}{" "}
                {animal.age === 1 ? "anno" : "anni"}
              </li>
              <li className="list-group-item">
                <strong>Vaccinato:</strong> {animal.isVaccinated ? "Sì" : "No"}
              </li>
              <li className="list-group-item">
                <strong>Pedigree:</strong> {animal.hasPedigree ? "Sì" : "No"}
              </li>
              <li className="list-group-item">
                <strong>Sterilizzato:</strong>{" "}
                {animal.isSterilized ? "Sì" : "No"}
              </li>
              <li className="list-group-item">
                <strong>Adottato:</strong> {animal.isAdopted ? "Sì" : "No"}
              </li>

              <li className="list-group-item">
                <strong>Pubblicato da:</strong>{" "}
                {animal.user?.firstName || "Utente anonimo"}
              </li>

              <li className="list-group-item">
                <strong>Contatti:</strong>{" "}
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={handleShowContact}
                >
                  Visualizza contatti
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4">
          <h5>📍 Dove si trova l’animale</h5>
          {animal.location ? (
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Via:</strong> {animal.location.street}
              </li>
              <li className="list-group-item">
                <strong>Città:</strong> {animal.location.city}
              </li>
              <li className="list-group-item">
                <strong>CAP:</strong> {animal.location.zipCode}
              </li>
              <li className="list-group-item">
                <strong>Regione:</strong> {animal.location.region}
              </li>
            </ul>
          ) : (
            <p>Posizione non disponibile</p>
          )}
        </div>

        <div className="mt-5">
          <h4>Descrizione</h4>
          <p>{animal.bio || "Nessuna descrizione disponibile."}</p>
        </div>
      </div>

      <>
        {showModal && (
          <>
            <div
              className="modal fade show d-block"
              tabIndex="-1"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      Contatti di {animal.user?.firstName}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>
                      <strong>Email:</strong>{" "}
                      <a
                        href={`mailto:${animal.user?.email}`}
                        className="text-decoration-none"
                      >
                        {animal.user?.email}
                      </a>
                    </p>
                    <p>
                      <strong>Telefono:</strong>{" "}
                      <a
                        href={`tel:${animal.user?.phoneNumber}`}
                        className="text-decoration-none"
                      >
                        {animal.user?.phoneNumber}
                      </a>
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Chiudi
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal-backdrop fade show"
              onClick={() => setShowModal(false)}
            ></div>
          </>
        )}
        {showLoginModal && (
          <>
            <div
              className="modal fade show d-block"
              tabIndex="-1"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      Accedi per visualizzare i contatti
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowLoginModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <LoginDetailPageModal
                      onSuccess={() => {
                        setIsAuthenticated(true);
                        setShowLoginModal(false);
                        setShowModal(true);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal-backdrop fade show"
              onClick={() => setShowLoginModal(false)}
            ></div>
          </>
        )}
      </>
    </BaseLayout>
  );
};

export default AnimalDetails;
