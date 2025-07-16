import React, { useEffect, useState } from "react";
import BaseLayout from "../layout/BaseLayout";
import { Link } from "react-router-dom";

const CatByAge = () => {
  const [cats, setCats] = useState([]);
  const [selectedAge, setSelectedAge] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 4;

  const allAges = Array.from({ length: 15 }, (_, i) => i + 1);

  const fetchCats = async (page = 1) => {
    try {
      setIsLoading(true);

      let url = `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/animals/search/species?species=Gatto&page=${page}&limit=${limit}`;

      if (selectedAge) {
        url = `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/animals/search/age?age=${selectedAge}&species=Gatto&page=${page}&limit=${limit}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setCats(data.animals || []);
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
    fetchCats(currentPage);
  }, [selectedAge, currentPage]);

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`btn btn-sm mx-1 ${
            i === currentPage ? "btn-success" : "btn-outline-success"
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    return <div className="d-flex justify-content-center mt-4">{pages}</div>;
  };

  return (
    <BaseLayout>
      <div className="container-fluid">
        <h2 className="text-center p-3">Cerca il tuo Gatto per Età</h2>
        <div className="row">
          <aside className="col-12 col-md-3 mb-4">
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
            {isLoading && <p>Caricamento...</p>}

            {!isLoading && cats.length > 0 && (
              <>
                <div className="row">
                  {cats.map((cat) => (
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
                        <div className="card-body">
                          <h4 className="card-title fw-bold mb-2">
                            {cat.name}
                          </h4>
                          <p className="mb-2">
                            <span className="badge bg-dark me-2">
                              {cat.breed}
                            </span>
                            <span className="badge bg-secondary">
                              {cat.race}
                            </span>
                          </p>
                          <p className="mb-2">
                            <strong>Età:</strong> {cat.age}{" "}
                            {cat.age === 1 ? "anno" : "anni"}
                          </p>
                          <p className="card-text mb-3">
                            {cat.bio || "Nessuna descrizione disponibile."}
                          </p>
                          <p className="text-muted mb-0">
                            <strong>Pubblicato da:</strong>{" "}
                            {cat.user?.firstName || "Utente anonimo"}
                          </p>
                          <div className="mt-auto">
                            <Link
                              className="text-decoration-none text-success"
                              to={`/animals/${cat._id}`}
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

            {!isLoading && cats.length === 0 && (
              <p className="mt-3 text-center">
                Nessun gatto trovato per questa età.
              </p>
            )}
          </section>
        </div>
      </div>
    </BaseLayout>
  );
};

export default CatByAge;
