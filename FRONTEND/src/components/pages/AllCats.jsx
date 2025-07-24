import React, { useEffect, useState } from "react";
import BaseLayout from "../layout/BaseLayout";
import { Link } from "react-router-dom";
import "../pages/allCats.css";

const AllCatsPage = () => {
  const [cats, setCats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 4;

  const fetchCats = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/animals/search/species?species=Gatto&page=${page}&limit=${limit}`
      );
      const data = await response.json();

      setCats(data.animals || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Errore durante il caricamento dei gatti:", error);
      alert("Errore durante il caricamento. Riprova più tardi.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCats(currentPage);
  }, [currentPage]);

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
      <div className="d-flex justify-content-center mt-4 flex-wrap">
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`btn btn-sm mx-1 mb-2 ${
              pageNumber === currentPage ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    );
  };

  return (
    <BaseLayout>
      <div className="container all-cat-container ">
        <h2 className="text-center p-3">Tutti i Gatti</h2>

        {isLoading && (
          <div class="d-flex justify-content-center align-items-center ">
            <div class="spinner-border text-success" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

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
                    <div className="card-body d-flex flex-column">
                      <h4 className="card-title fw-bold mb-2">{cat.name}</h4>

                      <p className="mb-2">
                        <span className="badge bg-dark me-2">{cat.breed}</span>
                        <span className="badge bg-secondary">{cat.race}</span>
                      </p>

                      <p className="mb-2">
                        <strong>Età:</strong> {cat.age}{" "}
                        {cat.age === 1 ? "anno" : "anni"}
                        <br />
                        <strong>Adottato:</strong> {cat.isAdopted}
                        {cat.isAdopted === true ? "Si" : "No"}
                      </p>

                      <p className="card-text mb-3">
                        {cat.bio || "Nessuna descrizione disponibile."}
                      </p>

                      <p className="text-muted mb-2 mt-auto">
                        <strong>Pubblicato da:</strong>{" "}
                        {cat.user?.firstName || "Utente anonimo"}
                      </p>

                      <Link
                        className="text-decoration-none text-success"
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

        {!isLoading && cats.length === 0 && (
          <p className="text-center mt-4">Nessun gatto trovato al momento.</p>
        )}
      </div>
    </BaseLayout>
  );
};

export default AllCatsPage;
