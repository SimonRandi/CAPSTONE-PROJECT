import React, { useEffect, useState } from "react";
import BaseLayout from "../layout/BaseLayout";
import { Link } from "react-router-dom";

const CatByRace = () => {
  const [catByRace, setCatByRace] = useState([]);
  const [selectedRace, setSelectedRace] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const searchByRace = async () => {
    try {
      setIsLoading(true);
      const url = selectedRace
        ? `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/animals/search/race?race=${selectedRace}&species=gatto`
        : `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/animals/search/species?species=gatto`;

      const response = await fetch(url);
      const data = await response.json();
      setCatByRace(data.animal || []);
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
    <>
      <BaseLayout>
        <div className="container-fluid">
          <h2 className="text-center mb-4">Cerca il tuo Pet per Razza</h2>
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

              {!isLoading && catByRace.length > 0 && (
                <div className="row">
                  {catByRace
                    .filter((cat) => cat.species === "Gatto")
                    .map((cat) => (
                      <div
                        key={cat._id}
                        className="col-12 col-md-4 col-lg-3 d-flex mt-3"
                      >
                        <div className="card shadow-sm rounded-4 overflow-hidden w-100">
                          <img
                            src={
                              cat.image ||
                              "https://picsum.photos/400/250?text=No+Image"
                            }
                            className="card-img-top"
                            alt={`Foto di ${cat.name}`}
                          />
                          <div className="card-body">
                            <h4 className="card-title fw-bold">{cat.name}</h4>

                            <p className="mb-2">
                              <span className="badge bg-secondary">
                                {cat.race}
                              </span>
                            </p>

                            <p className="mb-2">
                              <strong>Età:</strong> {cat.age}{" "}
                              {cat.age === 1 ? "anno" : "anni"}
                            </p>

                            <p className="card-text">
                              {cat.bio || "Nessuna descrizione disponibile."}
                            </p>

                            <p className="text-muted">
                              <strong>Pubblicato da:</strong>{" "}
                              {cat.user?.name || "Utente anonimo"}
                            </p>
                            <div className="mt-auto ">
                              <Link
                                className="text-decoration-none text-success "
                                to={`/animals/${cat._id}`}
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

              {!isLoading && catByRace.length === 0 && (
                <p>Nessun Gatto trovato per questa razza.</p>
              )}
            </section>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default CatByRace;
