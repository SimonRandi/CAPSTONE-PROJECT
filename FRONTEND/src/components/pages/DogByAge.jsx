import React, { useEffect, useState } from "react";
import BaseLayout from "../layout/BaseLayout";
import "../pages/dogByAge.css";
import { Link } from "react-router-dom";

const DogByAge = () => {
  const [dogs, setDogs] = useState([]);
  const [selectedAge, setSelectedAge] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 4;

  const allAges = Array.from({ length: 15 }, (_, i) => i + 1);

  const fetchDogs = async (page = 1) => {
    try {
      setIsLoading(true);
      let url = `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/animals/search/species?species=Cane&page=${page}&limit=${limit}`;

      if (selectedAge) {
        url = `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/animals/search/age?age=${selectedAge}&species=Cane&page=${page}&limit=${limit}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setDogs(data.animals || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Errore nel caricamento:", error.message || error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedAge]);

  useEffect(() => {
    fetchDogs(currentPage);
  }, [selectedAge, currentPage]);

  const renderPagination = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <div className="d-flex mb-2 justify-content-center mt-4">
        {pages.map((page) => (
          <button
            key={page}
            className={`btn btn-sm mx-1 ${
              page === currentPage ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    );
  };

  return (
    <BaseLayout>
      <div className="container-fluid all-dog-container">
        <h2 className="text-center p-3">Cerca il tuo Cane per Età</h2>
        <div className="row">
          <aside className="col-12 col-md-3 mb-4 ">
            <div className="list-group scrollbar-list">
              <button
                className={`list-group-item list-group-item-action ${
                  selectedAge === "" ? "active bg-success" : ""
                }`}
                onClick={() => setSelectedAge("")}
              >
                Tutte le età
              </button>
              {allAges.map((age) => (
                <button
                  key={age}
                  className={`list-group-item list-group-item-action ${
                    selectedAge === age.toString() ? "active bg-success" : ""
                  }`}
                  onClick={() => setSelectedAge(age.toString())}
                >
                  {age} {age === 1 ? "anno" : "anni"}
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

            {!isLoading && dogs.length > 0 && (
              <>
                <div className="row">
                  {dogs.map((dog) => (
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
                              className="text-decoration-none text-success "
                              to={`/animals/${dog._id}`}
                            >
                              Piu informazioni
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

            {!isLoading && dogs.length === 0 && (
              <p className="mt-3 text-center">
                Nessun cane trovato per questa età.
              </p>
            )}
          </section>
        </div>
      </div>
    </BaseLayout>
  );
};

export default DogByAge;
