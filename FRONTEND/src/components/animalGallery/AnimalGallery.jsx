import React, { useState } from "react";
import "../animalGallery/animalGallery.css";

const AnimalGallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  if (!images || images.length === 0) {
    return (
      <img
        src="https://picsum.photos/500/350?text=Nessuna+immagine"
        alt="Nessuna Imamgine"
      />
    );
  }

  return (
    <>
      <div className="mb-4">
        <div className="text-center mb-3">
          <img
            src={selectedImage}
            alt="Immagine selezionata"
            className="img-fluid main-image rounded shadow"
          />
        </div>

        <div className="d-flex justify-content-center gap-2 flex-wrap">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Miniatura ${index + 1}`}
              onClick={() => setSelectedImage(img)}
              className={`rounded border  carusel-image  ${
                selectedImage === img ? "border-success border-3" : "border-1"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AnimalGallery;
