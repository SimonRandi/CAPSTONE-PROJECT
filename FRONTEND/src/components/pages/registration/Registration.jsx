import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import Button from "../../button/Button";

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",

    housingType: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const form = new FormData();

      for (let key in formData) {
        if (formData[key]) {
          form.append(key, formData[key]);
        }
      }

      if (profileImage) {
        form.append("profileImage", profileImage);
      }

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/users/create`,
        {
          method: "POST",
          body: form,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Errore durante la registrazione");
      }

      setSuccessMessage(
        "Registrazione completata! Controlla la tua email per confermare l'account."
      );
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseLayout>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Crea un nuovo account</h2>

        <form autoComplete="off" className="mx-auto" onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Nome</label>
              <input
                type="text"
                name="firstName"
                required
                minLength={3}
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Cognome</label>
              <input
                type="text"
                name="lastName"
                required
                minLength={3}
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                autoComplete="new-email"
                type="email"
                name="email"
                required
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Telefono</label>
              <input
                type="tel"
                name="phoneNumber"
                required
                min={10}
                className="form-control"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                autoComplete="new-password"
                type="password"
                name="password"
                required
                minLength={8}
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Data di nascita</label>
              <input
                type="date"
                name="dateOfBirth"
                required
                className="form-control"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Genere</label>
              <select
                name="gender"
                required
                className="form-select"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Seleziona</option>
                <option value="Maschio">Maschio</option>
                <option value="Femmina">Femmina</option>
                <option value="Altro">Altro</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Tipo di abitazione</label>
              <select
                name="housingType"
                required
                className="form-select"
                value={formData.housingType}
                onChange={handleChange}
              >
                <option value="">Seleziona</option>
                <option value="Appartamento">Appartamento</option>
                <option value="Casa con giardino">Casa con giardino</option>
                <option value="Casa senza giardino">Casa senza giardino</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Immagine profilo</label>
              <input
                type="file"
                accept="image/*"
                name="profileImage"
                className="form-control"
                onChange={(e) => setProfileImage(e.target.files[0])}
              />
            </div>
          </div>

          {error && <p className="text-danger mt-3">{error}</p>}
          {successMessage && (
            <p className="text-success mt-3">{successMessage}</p>
          )}

          <div className="mt-4 d-flex justify-content-center">
            <Button
              isLoading={isLoading}
              type="submit"
              text="Registrati"
              variant="success"
            />
          </div>
        </form>
      </div>
    </BaseLayout>
  );
};

export default Registration;
