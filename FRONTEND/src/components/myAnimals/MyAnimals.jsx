import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyAnimals = () => {
  const [myAnimals, setMyAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyAnimals = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token mancante. Effettua il login.");

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/animals/my-animals`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(err.message || "Errore durante il recupero.");
      }

      const data = await response.json();
      setMyAnimals(data.animals || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAnimals();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">I miei annunci di adozione</h2>

      {loading && <p>Caricamento...</p>}
      {console.log(error)}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && myAnimals.length === 0 && (
        <p className="text-muted text-center">Nessun annuncio pubblicato.</p>
      )}

      <div className="row">
        {myAnimals.map((animal) => (
          <div key={animal._id} className="col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow rounded-4 overflow-hidden">
              <img
                src={
                  Array.isArray(animal.image) && animal.image.length > 0
                    ? animal.image[0]
                    : "https://picsum.photos/400/250?text=Nessuna+immagine"
                }
                className="card-img-top"
                alt={animal.name}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{animal.name}</h5>
                <p className="card-text">
                  <strong>Razza:</strong> {animal.race} <br />
                  <strong>Taglia:</strong> {animal.breed} <br />
                  <strong>Età:</strong> {animal.age}{" "}
                  {animal.age === 1 ? "anno" : "anni"}
                </p>
                <p className="text-muted mt-auto">
                  <Link to={`/animals/${animal._id}`} className="text-success">
                    Vedi dettagli →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAnimals;
