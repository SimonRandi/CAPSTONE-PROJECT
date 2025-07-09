import React from "react";

const Hero = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center container mt-5">
      <h2 className="fs-1">Ciao!</h2>
      <p className="fw-ligth fs-2 text-center">
        Il mio nome è Simone, e questa è la mia piattaforma di adozioni{" "}
        <strong>AnimalRanch</strong>. <br />
        L'idea nasce dalla mia passione per il mondo degli animali, che con il
        passare del tempo, <br /> è diventata anche la mia professione. <br />
        Con questa piattaforma io voglio aiutare i tantissimi cani e gatti che
        cercano una nuova famiglia, <br /> a trovare l'amore.
      </p>
    </div>
  );
};

export default Hero;
