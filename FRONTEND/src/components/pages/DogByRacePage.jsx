import React, { useEffect, useState } from "react";
import BaseLayout from "../layout/BaseLayout";
import "../pages/dogByRace.css";
import { Link } from "react-router-dom";
import Button from "../button/Button";

const DogByRacePage = () => {
  const [dogsByRace, setDogsByRace] = useState([]);
  const [selectedRace, setSelectedRace] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const allRaces = [
    "Pinscher",
    "Bulldog",
    "Labrador",
    "Segugio",
    "Beagle",
    "Boxer",
    "Shih Tzu",
    "Dobermann",
    "Husky",
    "Chihuahua",
    "Golden Retriever",
  ];

  const searchByRace = async () => {
    try {
      setIsLoading(true);
      const url = selectedRace
        ? `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/animals/search/race?race=${selectedRace}&species=cane`
        : `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/animals/search/species?species=cane`;
      const response = await fetch(url);
      const data = await response.json();
      setDogsByRace(data.animal || []);
    } catch (error) {
      console.error("Errore durante il caricamento:", error.message || error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    searchByRace();
  }, [selectedRace]);

  return (
    <BaseLayout>
      <div className="container-fluid">
        <h2 className="text-center mb-4">Cerca il tuo Cane per Razza</h2>
        <div className="row ">
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
            {isLoading && <p>Caricamento...</p>}

            {!isLoading && dogsByRace.length > 0 && (
              <div className="row">
                {dogsByRace
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
                            {dog.user?.name || "Utente anonimo"}
                          </p>{" "}
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
