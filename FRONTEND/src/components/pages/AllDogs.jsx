import React, { useEffect, useState } from "react";
import BaseLayout from "../layout/BaseLayout";
import { Link } from "react-router-dom";
import "../pages/allDogs.css";
const AllDogsPage = () => {
  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 4;

  const fetchDogs = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/animals/search/species?species=Cane&page=${page}&limit=${limit}`
      );
      const data = await response.json();
      setDogs(data.animals || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Errore nel caricamento:", error.message || error);
      alert("Errore nel caricamento dei cani.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDogs(currentPage);
  }, [currentPage]);

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    return (
      <div className="d-flex justify-content-center mt-4 flex-wrap">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              className={`btn btn-sm mx-1 mb-2 ${
                pageNumber === currentPage
                  ? "btn-success"
                  : "btn-outline-success"
              }`}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    );
  };

  return (
    <BaseLayout>
      <div className="container all-dog-container">
        <h2 className="text-center p-3">Tutti i Cani</h2>

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
                  className="col-12 col-md-4 col-lg-3 mb-3"
                  data-aos="fade-up"
                >
                  <div className="card shadow-sm rounded-4 overflow-hidden h-100">
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
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title fw-bold">{dog.name}</h5>
                      <p>
                        <strong>Razza:</strong> {dog.race}
                        <br />
                        <strong>Taglia:</strong> {dog.breed}
                        <br />
                        <strong>Età:</strong> {dog.age}{" "}
                        {dog.age === 1 ? "anno" : "anni"}
                      </p>
                      <p className="card-text">
                        {dog.bio || "Nessuna descrizione disponibile."}
                      </p>
                      <p className="text-muted mt-auto">
                        <strong>Pubblicato da:</strong>{" "}
                        {dog.user?.firstName || "Utente anonimo"}
                      </p>
                      <Link
                        className="text-decoration-none text-success mt-2"
                        to={`/animals/${dog._id}`}
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

        {!isLoading && dogs.length === 0 && (
          <div className="custom-div">
            <p className="text-center mt-4">Nessun cane disponibile.</p>
          </div>
        )}
      </div>
    </BaseLayout>
  );
};

export default AllDogsPage;
