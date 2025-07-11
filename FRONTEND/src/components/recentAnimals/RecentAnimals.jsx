import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../recentAnimals/recentAnimals.css";

const RecentAnimals = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const fetchRecentAnimals = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/animals`
        );
        const data = await response.json();
        const sorted = [...data.animals].reverse().slice(0, 6);
        setAnimals(sorted);
      } catch (err) {
        console.error("Errore nel caricamento:", err.message);
      }
    };

    fetchRecentAnimals();
  }, []);

  if (animals.length === 0) return null;

  return (
    <div className="container my-5">
      <h3 className="text-center mb-4">🐾 Annunci Recenti</h3>

      <div className="carousel-container position-relative">
        <div
          id="recentCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row">
                {animals.map((animal) => (
                  <div className="col-md-4" key={animal._id}>
                    <div className="card mb-3 shadow">
                      <img
                        src={
                          Array.isArray(animal.image) && animal.image.length > 0
                            ? animal.image[0]
                            : "https://picsum.photos/400/250?text=Nessuna+immagine"
                        }
                        className="card-img-top image-dimension"
                        alt={animal.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{animal.name}</h5>
                        <p className="card-text">
                          <strong>Specie: {animal.species} </strong> <br />
                          <strong>Razza:</strong> {animal.race} <br />
                          <strong>Età:</strong> {animal.age}{" "}
                          {animal.age === 1 ? "anno" : "anni"}
                        </p>
                        <Link
                          to={`/animals/${animal._id}`}
                          className="btn btn-success btn-sm"
                        >
                          Vedi dettagli →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#recentCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#recentCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentAnimals;
