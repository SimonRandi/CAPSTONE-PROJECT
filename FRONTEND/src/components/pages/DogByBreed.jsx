import React, { useEffect, useState } from "react";
import BaseLayout from "../layout/BaseLayout";
import { Link } from "react-router-dom";

const DogByBreedPage = () => {
  const [dogsByBreed, setDogsByBreed] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 4;
  const allBreeds = ["Small", "Medium", "Large", "Giant"];

  const fetchDogs = async (page = 1) => {
    try {
      setIsLoading(true);
      const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

      const url = selectedBreed
        ? `${baseUrl}/animals/search/breed?breed=${selectedBreed}&species=Cane&page=${page}&limit=${limit}`
        : `${baseUrl}/animals/search/species?species=Cane&page=${page}&limit=${limit}`;

      const response = await fetch(url);
      const data = await response.json();

      setDogsByBreed(data.animals || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Errore nel caricamento:", error.message || error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBreed]);

  useEffect(() => {
    fetchDogs(currentPage);
  }, [currentPage, selectedBreed]);

  const renderPagination = () => {
    return (
      <div className="d-flex mb-2 justify-content-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            className={`btn btn-sm mx-1 ${
              num === currentPage ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setCurrentPage(num)}
          >
            {num}
          </button>
        ))}
      </div>
    );
  };

  return (
    <BaseLayout>
      <div className="container-fluid">
        <h2 className="text-center p-3">Cerca il tuo Cane per Taglia</h2>
        <div className="row">
          <aside className="col-12 col-md-3 mb-4">
            <div className="list-group">
              <button
                className={`list-group-item list-group-item-action ${
                  selectedBreed === "" ? "active bg-success" : ""
                }`}
                onClick={() => setSelectedBreed("")}
              >
                Tutte le taglie
              </button>
              {allBreeds.map((breed) => (
                <button
                  key={breed}
                  className={`list-group-item list-group-item-action ${
                    selectedBreed === breed ? "active bg-success" : ""
                  }`}
                  onClick={() => setSelectedBreed(breed)}
                >
                  {breed}
                </button>
              ))}
            </div>
          </aside>

          <section className="col-12 col-md-9">
            {isLoading && <p>Caricamento...</p>}

            {!isLoading && dogsByBreed.length > 0 && (
              <>
                <div className="row">
                  {dogsByBreed.map((dog) => (
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
                          <h4 className="card-title fw-bold mb-2">
                            {dog.name}
                          </h4>
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
                          <p className="card-text mb-3">
                            {dog.bio || "Nessuna descrizione disponibile."}
                          </p>
                          <p className="text-muted mb-0">
                            <strong>Pubblicato da:</strong>{" "}
                            {dog.user?.firstName || "Utente anonimo"}
                          </p>
                          <div className="mt-auto ">
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

            {!isLoading && dogsByBreed.length === 0 && (
              <p className="mt-3 text-center">
                Nessun cane trovato per questa taglia.
              </p>
            )}
          </section>
        </div>
      </div>
    </BaseLayout>
  );
};

export default DogByBreedPage;
