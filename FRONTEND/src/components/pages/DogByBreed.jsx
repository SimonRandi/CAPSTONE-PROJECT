import React, { useEffect, useState } from "react";
import BaseLayout from "../layout/BaseLayout";
import { Link } from "react-router-dom";

const DogByBreedPage = () => {
  const [dogsByBreed, setDogsByBreed] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const allBreeds = ["Small", "Medium", "Large", "Giant"];

  const fetchDogs = async () => {
    try {
      setIsLoading(true);
      const url = selectedBreed
        ? `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/animals/search/breed?breed=${selectedBreed}&species=cane`
        : `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/animals/search/species?species=cane`;

      const response = await fetch(url);
      const data = await response.json();
      setDogsByBreed(data.animal || []);
    } catch (error) {
      console.error("Errore nel caricamento:", error.message || error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDogs();
  }, [selectedBreed]);

  return (
    <BaseLayout>
      <div className="container-fluid">
        <h2 className="text-center mb-4">Cerca il tuo Cane per Taglia</h2>
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
              <div className="row">
                {dogsByBreed
                  .filter((dog) => dog.species === "Cane")
                  .map((dog) => (
                    <div
                      key={dog._id}
                      className="col-12 col-md-4 col-lg-3 d-flex mt-3"
                    >
                      <div className="card shadow-sm rounded-4 overflow-hidden w-100">
                        <img
                          src={
                            dog.image ||
                            "https://picsum.photos/400/250?text=No+Image"
                          }
                          className="card-img-top"
                          alt={`Foto di ${dog.name}`}
                          style={{ height: "200px", objectFit: "cover" }}
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

            {!isLoading && dogsByBreed.length === 0 && (
              <p className="mt-3">Nessun cane trovato per questa taglia.</p>
            )}
          </section>
        </div>
      </div>
    </BaseLayout>
  );
};

export default DogByBreedPage;
