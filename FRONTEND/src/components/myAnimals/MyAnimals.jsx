// MyAnimals.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { Modal, Button, Form } from "react-bootstrap";

const MyAnimals = () => {
  const [myAnimals, setMyAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAnimalId, setSelectedAnimalId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    species: "",
    race: "",
    breed: "",
    age: "",
    bio: "",
    food: "",
    isVaccinated: false,
    hasPedigree: false,
    isSterilized: false,
    isAdopted: false,
    note: "",
    image: [],
    location: {
      street: "",
      city: "",
      zipCode: "",
      region: "",
    },
  });
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

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
        throw new Error(error.message || "Errore durante il recupero.");
      }

      const data = await response.json();
      setMyAnimals(data.animals || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setSelectedAnimalId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/animals/delete/${selectedAnimalId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Errore durante l'eliminazione.");
      }

      setShowDeleteModal(false);
      setSuccessMessage("Annuncio eliminato con successo!");
      setTimeout(() => setSuccessMessage(""), 2000);
      setSelectedAnimalId(null);
      fetchMyAnimals();
    } catch (err) {
      alert(err.message);
    }
  };

  const openEditModal = (animal) => {
    setSelectedAnimalId(animal._id);
    setEditForm(animal);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("location.")) {
      const field = name.split(".")[1];
      setEditForm((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [field]: value,
        },
      }));
    } else if (type === "checkbox") {
      setEditForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setEditForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/animals/edit/${selectedAnimalId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editForm),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Errore durante la modifica.");
      }

      setShowEditModal(false);
      setSuccessMessage("Annuncio modificato con successo!");
      setTimeout(() => setSuccessMessage(""), 2000);
      fetchMyAnimals();
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchMyAnimals();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">I miei annunci di adozione</h2>
      {successMessage && (
        <div className="alert alert-success text-center">{successMessage}</div>
      )}
      {isLoading && <p>Caricamento...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!isLoading && !error && myAnimals.length === 0 && (
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
                <div className="d-flex justify-content-between mt-3">
                  <button
                    onClick={() => openEditModal(animal)}
                    className="btn border-0 btn-sm btn-outline-primary"
                  >
                    <Pencil />
                  </button>
                  <button
                    onClick={() => confirmDelete(animal._id)}
                    className="btn border-0 btn-sm btn-outline-danger"
                  >
                    <Trash2 />
                  </button>
                </div>
                <p className="text-muted mt-2 text-end">
                  <Link to={`/animals/${animal._id}`} className="text-success">
                    Vedi dettagli
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Conferma eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sei sicuro di voler eliminare questo annuncio?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Annulla
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifica Annuncio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-2">
              <label className="form-label">Nome</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Specie</label>
              <input
                type="text"
                className="form-control"
                name="species"
                value={editForm.species}
                onChange={handleEditChange}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Razza</label>
              <input
                type="text"
                className="form-control"
                name="race"
                value={editForm.race}
                onChange={handleEditChange}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Taglia</label>
              <input
                type="text"
                className="form-control"
                name="breed"
                value={editForm.breed}
                onChange={handleEditChange}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Età</label>
              <input
                type="number"
                className="form-control"
                name="age"
                value={editForm.age}
                onChange={handleEditChange}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Cibo preferito</label>
              <input
                type="text"
                className="form-control"
                name="food"
                value={editForm.food}
                onChange={handleEditChange}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Bio</label>
              <textarea
                className="form-control"
                name="bio"
                value={editForm.bio}
                onChange={handleEditChange}
              ></textarea>
            </div>

            <div className="mb-2 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="isVaccinated"
                checked={editForm.isVaccinated}
                onChange={(e) =>
                  handleEditChange({
                    target: { name: "isVaccinated", value: e.target.checked },
                  })
                }
              />
              <label className="form-check-label">Vaccinato</label>
            </div>

            <div className="mb-2 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="hasPedigree"
                checked={editForm.hasPedigree}
                onChange={(e) =>
                  handleEditChange({
                    target: { name: "hasPedigree", value: e.target.checked },
                  })
                }
              />
              <label className="form-check-label">Pedigree</label>
            </div>

            <div className="mb-2 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="isSterilized"
                checked={editForm.isSterilized}
                onChange={(e) =>
                  handleEditChange({
                    target: { name: "isSterilized", value: e.target.checked },
                  })
                }
              />
              <label className="form-check-label">Sterilizzato</label>
            </div>

            <div className="mb-2 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="isAdopted"
                checked={editForm.isAdopted}
                onChange={(e) =>
                  handleEditChange({
                    target: { name: "isAdopted", value: e.target.checked },
                  })
                }
              />
              <label className="form-check-label">Adottato</label>
            </div>

            <div className="mb-2">
              <label className="form-label">Note</label>
              <textarea
                className="form-control"
                name="note"
                value={editForm.note}
                onChange={handleEditChange}
              ></textarea>
            </div>

            <h5 className="mt-4">📍 Posizione</h5>

            <div className="mb-2">
              <label className="form-label">Via</label>
              <input
                type="text"
                className="form-control"
                name="location.street"
                value={editForm.location?.street || ""}
                onChange={handleEditChange}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Città</label>
              <input
                type="text"
                className="form-control"
                name="location.city"
                value={editForm.location?.city || ""}
                onChange={handleEditChange}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">CAP</label>
              <input
                type="text"
                className="form-control"
                name="location.zipCode"
                value={editForm.location?.zipCode || ""}
                onChange={handleEditChange}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Regione</label>
              <input
                type="text"
                className="form-control"
                name="location.region"
                value={editForm.location?.region || ""}
                onChange={handleEditChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Annulla
          </Button>
          <Button
            isLoading={isLoading}
            variant="success"
            onClick={handleEditSubmit}
          >
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyAnimals;
