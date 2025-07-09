import React, { useEffect, useState } from "react";
import BaseLayout from "../layout/BaseLayout";
import { Link } from "react-router-dom";

const AllDogsPage = () => {
  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllDogs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/animals/search/species?species=cane`
      );
      const data = await response.json();
      setDogs(data.animal || []);
    } catch (error) {
      console.error("Errore nel caricamento:", error.message || error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDogs();
  }, []);

  return (
    <BaseLayout>
      <div className="container">
        <h2 className="text-center mt-4 mb-4">Tutti i Cani</h2>

        {isLoading && <p>Caricamento...</p>}

        {!isLoading && dogs.length > 0 && (
          <div className="row">
            {dogs.map((dog) => (
              <div key={dog._id} className="col-12 col-md-4 col-lg-3 mb-4">
                <div className="card shadow-sm rounded-4 overflow-hidden h-100">
                  <img
                    src={
                      dog.image || "https://picsum.photos/400/250?text=No+Image"
                    }
                    className="card-img-top"
                    alt={`Foto di ${dog.name}`}
                  />
                  <div className="card-body">
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
                    <p className="text-muted">
                      <strong>Pubblicato da:</strong>{" "}
                      {dog.user?.name || "Utente anonimo"}
                    </p>
                    <div className="mt-auto ">
                      <Link
                        className="text-decoration-none text-success "
                        to={`/animals/${dog._id}`}
                      >
                        {" "}
                        Piu informazioni
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && dogs.length === 0 && <p>Nessun cane disponibile.</p>}
      </div>
    </BaseLayout>
  );
};

export default AllDogsPage;
