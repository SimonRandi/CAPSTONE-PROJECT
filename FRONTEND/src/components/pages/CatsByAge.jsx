import React, { useEffect, useState } from "react";
import BaseLayout from "../layout/BaseLayout";
import { Link } from "react-router-dom";

const CatByAge = () => {
  const [cats, setCats] = useState([]);
  const [selectedAge, setSelectedAge] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const allAges = Array.from({ length: 15 }, (_, i) => i + 1);

  const searchCats = async () => {
    try {
      setIsLoading(true);

      let url = `${
        import.meta.env.VITE_SERVER_BASE_URL
      }/animals/search/species?species=gatto`;

      if (selectedAge) {
        url = `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/animals/search/age?age=${selectedAge}&species=gatto`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setCats(data.animal || []);
    } catch (error) {
      console.error("Errore nel caricamento:", error.message || error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    searchCats();
  }, [selectedAge]);

  return (
    <BaseLayout>
      <div className="container-fluid">
        <h2 className="text-center mt-4 mb-4">Cerca il tuo Gatto per Età</h2>
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
              <div className="row">
                {cats
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
