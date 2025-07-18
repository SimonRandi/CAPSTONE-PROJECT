import React from "react";
import BaseLayout from "../../layout/BaseLayout";
import Button from "../../button/Button";
import { Link } from "react-router-dom";
import "../aboutUs/aboutUs.css";
import siriusAndMe from "../../../../img/me+sirius.jpeg";
import niceAndMe from "../../../../img/me+nice.jpeg";

const AboutUsPage = () => {
  const handleClick = () => {
    window.location.href = "/";
  };
  return (
    <BaseLayout>
      <div className="container py-5">
        <div className="row d-flex flex-column align-items-center mb-5">
          <div className="col-md-12 d-flex flex-column justify-content-center p-3">
            <h3 className="mb-3 text-center heading">Chi sono</h3>
            <p className="fs-3 heading text-center">
              Ciao! Sono Simone e sono il fondatore di AnimalRanch. <br />
              Questo progetto nasce dalla mia passione per gli animali, che è
              diventata anche il mio lavoro. Quando mi è stato chiesto di
              presentare un progetto che mi rispecchiasse, ho avuto l'idea di
              creare un posto dove i tanti amici in difficoltà possano trovare
              la famiglia giusta per loro. E' proprio cosi che è nato{" "}
              <Link
                className="text-decoration-none navbar-brand fs-3  mx-auto navbar-center-logo fw-bold text-danger"
                to="/"
              >
                🐶 Animal<span className="text-warning">Ranch</span>🐱
              </Link>
            </p>
            <p className="fs-3"></p>
          </div>
          <div className="row ">
            <div data-aos="fade-left" className="col-md-6 order-2 ">
              <img
                src={siriusAndMe}
                alt="Sirius and me"
                className="img-fluid main-image rounded shadow"
              />
            </div>
            <div
              data-aos="fade-right"
              className="col-md-6 heading d-flex flex-column justify-content-center fs-3 order-1"
            >
              <h3 className="mb-3 heading">La mia Famiglia</h3>
              <p className="">
                Lui è sirius, il mio fedele amico.
                <br />
                E' un segugio vandeano, e l'ho salvato dalla strada quando aveva
                pochi mesi. <br />
                Adesso ha 8 anni.
              </p>
            </div>
          </div>
        </div>

        <div className="row mb-5">
          <div data-aos="fade-right" className="col-md-6 order-md-1 order-2">
            <img
              src={niceAndMe}
              alt="Adozione di animali"
              className="img-fluid  rounded shadow"
            />
          </div>
          <div
            data-aos="fade-left"
            className="col-md-6 d-flex flex-column order-md-2 order-1 text-start justify-content-center"
          >
            <h3 className="mb-3 heading">Cosa facciamo</h3>
            <p className="fs-3 heading">
              In questo sito potrai trovare l'animale giusto per te o ,allo
              stesso tempo, potrai mettere in adozione un animale del quale
              magari non riesci piu a prenderti cura.
            </p>
          </div>
        </div>

        <div data-aos="fade-up" className="text-center ">
          <h3 className="heading">Unisciti a noi!</h3>
          <p className="fs-3 heading">
            Che tu voglia adottare o semplicemente supportare la causa, ogni
            contributo fa la differenza. Insieme possiamo costruire un futuro
            migliore per i nostri amici a quattro zampe.
          </p>
          <Button variant="success" text="Iniziamo" onClick={handleClick} />
        </div>
      </div>
    </BaseLayout>
  );
};

export default AboutUsPage;
