import { useState } from "react";
import "../../components/newPost/newPost.css";
import Button from "../button/Button";

const NewPost = () => {
  const [formData, setFormData] = useState({
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

  const [isLoading, setIsLoading] = useState(false);
  const [imagesFiles, setImagesFiles] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });

  const capitalizeWords = (str) =>
    str
      .toLowerCase()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue = value;

    // Capitalizza la razza
    if (name === "race") {
      newValue = capitalizeWords(value);
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage({
          type: "error",
          text: "Token non trovato. Effettua il login.",
        });
        return;
      }

      let uploadedImageUrls = [];

      if (imagesFiles.length > 0) {
        const imageData = new FormData();
        imagesFiles.forEach((file) => {
          imageData.append("images", file);
        });

        const uploadImage = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/animals/cloud-upload`,
          {
            method: "POST",
            body: imageData,
          }
        );

        if (!uploadImage.ok) {
          throw new Error("Errore durante il caricamento immagini.");
        }

        const uploadData = await uploadImage.json();
        uploadedImageUrls = uploadData.images;
      }

      const finalPost = {
        ...formData,
        image: uploadedImageUrls,
      };

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/animals/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(finalPost),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Errore durante la creazione.");
      }

      setMessage({
        type: "success",
        text: "Annuncio pubblicato con successo!",
      });

      setTimeout(() => setMessage({ type: "", text: "" }), 3000);

      setFormData({
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

      setImagesFiles([]);
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="new-post-form container mt-4 p-3 p-md-4 rounded shadow bg-white"
    >
      <h2 className="mb-4">Crea un annuncio di adozione</h2>

      {message.text && (
        <div
          className={`alert ${
            message.type === "success" ? "alert-success" : "alert-danger"
          }`}
          role="alert"
        >
          {message.text}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Nome</label>
        <input
          type="text"
          className="form-control"
          name="name"
          minLength={2}
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Specie</label>
        <select
          className="form-select"
          name="species"
          value={formData.species}
          onChange={handleChange}
          required
        >
          <option value="">Seleziona specie</option>
          <option value="Cane">Cane</option>
          <option value="Gatto">Gatto</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Razza</label>
        <input
          type="text"
          className="form-control"
          name="race"
          value={formData.race}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Taglia</label>
        <select
          className="form-select"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          required
        >
          <option value="">Seleziona taglia</option>
          <option value="Small">Piccola</option>
          <option value="Medium">Media</option>
          <option value="Large">Grande</option>
          <option value="Giant">Gigante</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Età</label>
        <input
          type="number"
          className="form-control"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          min="0"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Descrizione</label>
        <textarea
          className="form-control"
          name="bio"
          rows="3"
          value={formData.bio}
          onChange={handleChange}
          required
          maxLength="500"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Alimentazione</label>
        <select
          className="form-select"
          name="food"
          value={formData.food}
          onChange={handleChange}
          required
        >
          <option value="">Seleziona alimentazione</option>
          <option value="DryFood">Crocchette</option>
          <option value="WetFood">Cibo umido</option>
          <option value="Mixed">Misto</option>
          <option value="Other">Altro</option>
        </select>
      </div>

      <div className="form-check form-switch mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          name="isVaccinated"
          checked={formData.isVaccinated}
          onChange={handleChange}
        />
        <label className="form-check-label">Vaccinato</label>
      </div>

      <div className="form-check form-switch mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          name="hasPedigree"
          checked={formData.hasPedigree}
          onChange={handleChange}
        />
        <label className="form-check-label">Pedigree</label>
      </div>

      <div className="form-check form-switch mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          name="isSterilized"
          checked={formData.isSterilized}
          onChange={handleChange}
        />
        <label className="form-check-label">Sterilizzato</label>
      </div>

      <div className="form-check form-switch mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          name="isAdopted"
          checked={formData.isAdopted}
          onChange={handleChange}
        />
        <label className="form-check-label">Adottato</label>
      </div>

      <div className="mb-3">
        <label className="form-label">Note aggiuntive</label>
        <textarea
          className="form-control"
          name="note"
          rows="2"
          value={formData.note}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Carica immagine</label>
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={(e) => setImagesFiles(Array.from(e.target.files))}
        />
      </div>

      <h5 className="mt-4">Dove si trova l’animale?</h5>

      <div className="mb-3">
        <label className="form-label">Via</label>
        <input
          type="text"
          className="form-control"
          name="street"
          value={formData.location.street}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              location: { ...prev.location, street: e.target.value },
            }))
          }
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Città</label>
        <input
          type="text"
          className="form-control"
          name="city"
          value={formData.location.city}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              location: { ...prev.location, city: e.target.value },
            }))
          }
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">CAP</label>
        <input
          type="text"
          className="form-control"
          name="zipCode"
          value={formData.location.zipCode}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              location: { ...prev.location, zipCode: e.target.value },
            }))
          }
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Regione</label>
        <input
          type="text"
          className="form-control"
          name="region"
          value={formData.location.region}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              location: { ...prev.location, region: e.target.value },
            }))
          }
          required
        />
      </div>

      <Button
        isLoading={isLoading}
        type="submit"
        text="Pubblica"
        variant="success"
      />
    </form>
  );
};

export default NewPost;
