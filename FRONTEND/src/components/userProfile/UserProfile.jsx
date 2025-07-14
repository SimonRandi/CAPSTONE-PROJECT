import React, { useEffect, useState } from "react";
import("../userProfile/userProfile.css");
import ProfilePhoto from "../../../img/user-profile-foto.png";
import { UserPen, Trash2 } from "lucide-react";
import { Modal, Button, Form } from "react-bootstrap";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const getMyProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Utente non autorizzato");
      }

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        setError("Errore nel recupero del profilo");
      }

      setUser(data.user);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/users/edit/${user._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        setError("Errore nella modifica");
      }

      setUser(data.userToUpdate);
      setShowModal(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/users/delete/${user._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Errore durante la cancellazione");
        return;
      }

      localStorage.removeItem("token");
      alert("Account eliminato con successo.");
      window.location.href = "/";
    } catch (error) {
      setError("Errore generico");
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <h2 className="p-0">Il tuo profilo</h2>

          {error && <p className="text-danger">{error}</p>}

          {user ? (
            <div className="col-12 mt-5">
              <div className="card custom-card-profile">
                <div className="image-profile-container d-flex justify-content-center">
                  <img
                    className="img-fluid custom-profile-image "
                    src={user.image}
                    alt=""
                  />
                </div>
                <p className="mt-1">
                  <strong>Nome:</strong> {user.firstName}
                </p>
                <p>
                  <strong>Cognome:</strong> {user.lastName}
                </p>
                <p>
                  <strong>Data di nascita:</strong>{" "}
                  {user.dateOfBirth.slice(0, 10)}
                </p>
                <p>
                  <strong>Telefono:</strong> {user.phoneNumber}
                </p>
                <p>
                  <strong>Abitazione:</strong> {user.housingType}
                </p>
                <div className="d-flex justify-content-between">
                  <button onClick={() => setShowModal(true)} className="btn">
                    <UserPen className="edit-icon" color="green" />
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="btn"
                  >
                    {" "}
                    <Trash2 className="delete-icon" color="red" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            !error && <p>Caricamento profilo... </p>
          )}

          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Modifica Profilo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Cognome</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Data di nascita</Form.Label>
                  <Form.Control
                    type="text"
                    name="dateOfBirth"
                    value={formData.dateOfBirth || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Abitazione</Form.Label>
                  <Form.Select
                    name="housingType"
                    value={formData.housingType || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleziona il tipo di abitazione</option>
                    <option value="Appartamento">Appartamento</option>
                    <option value="Casa con giardino">Casa con giardino</option>
                    <option value="Casa senza giardino">
                      Casa senza giardino
                    </option>
                    <option value="Altro">Altro</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Annulla
              </Button>
              <Button variant="success" onClick={updateUser}>
                Salva
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Conferma Eliminazione</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Sei sicuro di voler eliminare definitivamente il tuo account?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Annulla
              </Button>
              <Button variant="danger" onClick={deleteUser}>
                Elimina
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
