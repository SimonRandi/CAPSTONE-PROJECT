import React, { useEffect, useState } from "react";
import BaseLayout from "../layout/BaseLayout";
import { Link } from "react-router-dom";

const CatByRace = () => {
  const [catByRace, setCatByRace] = useState([]);
  const [selectedRace, setSelectedRace] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 4;

  const allRaces = [
    "Europeo",
    "Persiano",
    "Siamese",
    "Maine Coon",
    "British Shorthair",
    "Bengala",
    "Sphynx",
    "Ragdoll",
    "Norvegese delle Foreste",
    "Scottish Fold",
  ];

  const searchByRace = async (page = 1) => {
    try {
      setIsLoading(true);

      const url = selectedRace
        ? `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/animals/search/race?race=${selectedRace}&species=Gatto&page=${page}&limit=${limit}`
        : `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/animals/search/species?species=Gatto&page=${page}&limit=${limit}`;

      const response = await fetch(url);
      const data = await response.json();

      setCatByRace(data.animals || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Errore durante il caricamento:", error.message || error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRace]);

  useEffect(() => {
    searchByRace(currentPage);
  }, [currentPage, selectedRace]);

  const handlePageClick = (page) => {
    if (page !== currentPage) setCurrentPage(page);
  };

  const renderPagination = () => {
    return (
      <div className="d-flex justify-content-center mt-4 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            className={`btn btn-sm mx-1 mb-2 ${
              pageNum === currentPage ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => handlePageClick(pageNum)}
          >
            {pageNum}
          </button>
        ))}
      </div>
    );
  };

  return (
    <BaseLayout>
      <div className="container-fluid all-cat-container">
        <h2 className="text-center p-3">Cerca il tuo Pet per Razza</h2>
        <div className="row">
          <aside className="col-12 col-md-3 mb-4 overflow-hidden">
            <div className="list-group scrollbar-list">
              <button
                className={`list-group-item list-group-item-action ${
                  selectedRace === "" ? "active bg-success" : ""
                }`}
                onClick={() => setSelectedRace("")}
              >
                Tutte le razze
              </button>
              {allRaces.map((race) => (
                <button
                  key={race}
                  className={`list-group-item list-group-item-action ${
                    selectedRace === race ? "active bg-success" : ""
                  }`}
                  onClick={() => setSelectedRace(race)}
                >
                  {race}
                </button>
              ))}
            </div>
          </aside>

          <section className="col-12 col-md-9">
            {isLoading && (
              <div class="d-flex justify-content-center align-items-center ">
                <div class="spinner-border text-success" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {!isLoading && catByRace.length > 0 && (
              <>
                <div className="row">
                  {catByRace.map((cat) => (
                    <div
                      key={cat._id}
                      className="col-12 col-md-4 col-lg-3 d-flex mb-3"
                      data-aos="fade-up"
                    >
                      <div className="card shadow-sm rounded-4 overflow-hidden w-100">
                        <img
                          src={
                            Array.isArray(cat.image)
                              ? cat.image[0] ||
                                "https://picsum.photos/400/250?text=No+Image"
                              : cat.image ||
                                "https://picsum.photos/400/250?text=No+Image"
                          }
                          className="card-img-top"
                          alt={`Foto di ${cat.name}`}
                        />
                        <div className="card-body d-flex flex-column">
                          <h4 className="card-title fw-bold">{cat.name}</h4>
                          <p className="mb-2">
                            <span className="badge bg-secondary">
                              {cat.race}
                            </span>
                          </p>
                          <p className="mb-2">
                            <strong>Età:</strong> {cat.age}{" "}
                            {cat.age === 1 ? "anno" : "anni"}
                            <br />
                            <strong>Adottato:</strong> {cat.isAdopted}
                            {cat.isAdopted === true ? "Si" : "No"}
                          </p>
                          <p className="card-text">
                            {cat.bio || "Nessuna descrizione disponibile."}
                          </p>
                          <p className="text-muted mt-auto">
                            <strong>Pubblicato da:</strong>{" "}
                            {cat.user?.firstName || "Utente anonimo"}
                          </p>
                          <Link
                            className="text-decoration-none text-success mt-2"
                            to={`/animals/${cat._id}`}
                          >
                            Più informazioni
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {renderPagination()}
              </>
            )}

            {!isLoading && catByRace.length === 0 && (
              <p>Nessun Gatto trovato per questa razza.</p>
            )}
          </section>
        </div>
      </div>
    </BaseLayout>
  );
};

export default CatByRace;
