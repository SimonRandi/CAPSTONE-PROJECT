import React, { useEffect, useState } from "react";
import BaseLayout from "../layout/BaseLayout";
import { Link } from "react-router-dom";
const AllCatsPage = () => {
  const [cats, setCats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const Cats = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/animals/search/species?species=gatto`
      );
      const data = await response.json();
      setCats(data.animal || []);
    } catch (error) {
      console.error(
        "Errore durante il caricamento dei gatti:",
        error.message || error
      );
      alert("Errore durante il caricamento. Riprova più tardi.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    Cats();
  }, []);

  return (
    <BaseLayout>
      <div className="container">
        <h2 className="text-center p-3">Tutti i Gatti</h2>

        {isLoading && <p className="text-center">Caricamento...</p>}

        {!isLoading && cats.length > 0 && (
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
                    <h4 className="card-title fw-bold mb-2">{cat.name}</h4>

                    <p className="mb-2">
                      <span className="badge bg-dark me-2">{cat.breed}</span>
                      <span className="badge bg-secondary">{cat.race}</span>
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
          <p className="text-center mt-4">Nessun gatto trovato al momento.</p>
        )}
      </div>
    </BaseLayout>
  );
};

export default AllCatsPage;
