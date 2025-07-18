import React, { useEffect, useState } from "react";
import BaseLayout from "../layout/BaseLayout";
import { Link } from "react-router-dom";
import "../pages/dogByRace.css";

const DogByRacePage = () => {
  const [dogsByRace, setDogsByRace] = useState([]);
  const [selectedRace, setSelectedRace] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 4;

  const allRaces = [
    "Labrador",
    "Golden Retriever",
    "Pastore Tedesco",
    "Bulldog Francese",
    "Beagle",
    "Barboncino",
    "Carlino",
    "Chihuahua",
    "Dobermann",
    "Alano",
    "Cocker Spaniel",
    "Jack Russell Terrier",
    "Shih Tzu",
    "Husky Siberiano",
    "Border Collie",
    "Bassotto",
    "Setter Irlandese",
    "Akita Inu",
    "Maltese",
    "Rottweiler",
    "Pinscher",
    "Meticcio",
  ];

  const searchByRace = async (page = 1) => {
    try {
      setIsLoading(true);
      const url = selectedRace
        ? `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/animals/search/race?race=${selectedRace}&species=Cane&page=${page}&limit=${limit}`
        : `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/animals/search/species?species=Cane&page=${page}&limit=${limit}`;

      const response = await fetch(url);
      const data = await response.json();
      setDogsByRace(data.animals || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Errore durante il caricamento:", error.message || error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    searchByRace(currentPage);
  }, [selectedRace, currentPage]);

  const handlePageClick = (page) => {
    if (page !== currentPage) setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    return (
      <div className="d-flex mb-2 justify-content-center mt-4">
        {pages.map((page) => (
          <button
            key={page}
            className={`btn btn-sm mx-1 ${
              page === currentPage ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}
      </div>
    );
  };

  return (
    <BaseLayout>
      <div className="container-fluid">
        <h2 className="text-center p-3">Cerca il tuo Cane per Razza</h2>
        <div className="row">
          <aside className="col-12 col-md-3 mb-4">
            <div className="list-group">
              <button
                className={`list-group-item list-group-item-action ${
                  selectedRace === "" ? "active bg-success" : ""
                }`}
                onClick={() => {
                  setSelectedRace("");
                  setCurrentPage(1);
                }}
              >
                Tutte le razze
              </button>
              {allRaces.map((race) => (
                <button
                  key={race}
                  className={`list-group-item  list-group-item-action ${
                    selectedRace === race ? "active bg-success" : ""
                  }`}
                  onClick={() => {
                    setSelectedRace(race);
                    setCurrentPage(1);
                  }}
                >
                  {race}
                </button>
              ))}
            </div>
          </aside>

          <section className="col-12 col-md-9">
            {isLoading && <p>Caricamento...</p>}

            {!isLoading && dogsByRace.length > 0 && (
              <>
                <div className="row">
                  {dogsByRace.map((dog) => (
                    <div
                      key={dog._id}
                      className="col-12 col-md-4 col-lg-3 d-flex mb-3"
                      data-aos="fade-up"
                    >
                      <div className="card shadow-sm rounded-4 overflow-hidden w-100">
                        <img
                          src={
                            Array.isArray(dog.image)
                              ? dog.image[0] ||
                                "https://picsum.photos/400/250?text=No+Image"
                              : dog.image ||
                                "https://picsum.photos/400/250?text=No+Image"
                          }
                          className="card-img-top"
                          alt={`Foto di ${dog.name}`}
                        />
                        <div className="card-body">
                          <h4 className="card-title fw-bold">{dog.name}</h4>
                          <p className="mb-2">
                            <span className="badge bg-dark me-2">
                              {dog.breed}
                            </span>
                            <span className="badge bg-secondary">
                              {dog.race}
                            </span>
                          </p>
                          <p className="mb-2">
                            <strong>Età:</strong> {dog.age}{" "}
                            {dog.age === 1 ? "anno" : "anni"}
                          </p>
                          <p className="card-text">
                            {dog.bio || "Nessuna descrizione disponibile."}
                          </p>
                          <p className="text-muted">
                            <strong>Pubblicato da:</strong>{" "}
                            {dog.user?.firstName || "Utente anonimo"}
                          </p>
                          <div className="mt-auto">
                            <Link
                              className="text-decoration-none text-success"
                              to={`/animals/${dog._id}`}
                            >
                              Più informazioni
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {renderPagination()}
              </>
            )}

            {!isLoading && dogsByRace.length === 0 && (
              <p>Nessun cane trovato per questa razza.</p>
            )}
          </section>
        </div>
      </div>
    </BaseLayout>
  );
};

export default DogByRacePage;
