import catInTheTree from "../../../img/gattoSullAlbero.png";
import dogWhoEating from "../../../img/caneCheMangia.png";
import "../introSection/introSection.css";

const IntroSection = () => {
  return (
    <div className="container-fluid ">
      <div className="row bg-success  ">
        <div className="col-12 col-md-6 ">
          <div
            data-aos="fade-up-right"
            className="d-flex justify-content-center align-items-center gap-4"
          >
            <div className="container-custom d-flex flex-column justify-content-center align-items-center mt-5">
              <img
                className="img-fluid customIntroiImg "
                src={dogWhoEating}
                alt=""
              />
              <p className=" text-center text-white fs-4 mt-3 ">
                Qui potrai conoscere i nostri amici pelosi, ascoltare le loro
                storie e trovare il compagno a quattro zampe che stavi
                aspettando.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 mt-3 ">
          <div
            data-aos="fade-up-left"
            className="d-flex justify-content-center gap-4"
          >
            <div className="container-custom d-flex flex-column justify-content-center align-items-center mt-5">
              <img
                className="img-fluid customIntroiImg"
                src={catInTheTree}
                alt=""
              />
              <p className=" text-center text-white fs-4 mt-3 ">
                Che tu voglia adottare, sostenere o semplicemente lasciarti
                ispirare, sei nel posto giusto. 🐶🐱
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
