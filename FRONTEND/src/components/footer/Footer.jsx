import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center gap-5 fs-3  p-5 bg-success">
        <div className="container">
          <div data-aos="fade-up" className="row ">
            <div className="col-12">
              <div className="d-flex flex-column align-items-center ">
                <Link
                  className="text-decoration-none fw-bold text-danger"
                  to="/"
                >
                  🐶 Animal<span className="text-warning">Ranch</span>🐱
                </Link>
              </div>
            </div>
            <footer className=" text-light p-4">
              <div className="container">
                <div className="row">
                  <div className="col-md-4 mb-3 d-flex flex-column align-items-center justify-content-center">
                    <h5>Esplora</h5>
                    <ul className="list-unstyled d-flex flex-column align-items-center">
                      <li>
                        <Link
                          to="/"
                          className="text-light text-center fs-5 text-decoration-none"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dogs"
                          className="text-light fs-5 text-decoration-none"
                        >
                          Tutti i Cani
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/cats"
                          className="text-light fs-5 text-decoration-none"
                        >
                          Tutti i Gatti
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="col-md-4 mb-3 d-flex flex-column gap-3 align-items-center">
                    <h5>Contatti</h5>
                    <p className="text-center fs-5">
                      Email:{" "}
                      <a
                        href="mailto:info@adottaunpet.it"
                        className="text-light fs-5 text-decoration-none"
                      >
                        info.animalranch@gmail.com
                      </a>
                    </p>
                  </div>

                  <div className="col-md-4 mb-3 d-flex flex-column gap-4 align-items-center ">
                    <h5 className="text-center">Informazioni</h5>
                    <p className="text-light fs-5 text-center">
                      Trova il tuo nuovo amico a quattro zampe. Contatta
                      direttamente il proprietario per adottare!
                    </p>
                  </div>
                </div>

                <hr className="border-top border-light" />
                <p className="text-light fs-5 text-decoration-none text-center">
                  © {new Date().getFullYear()} 🐶 Animal
                  <span className="text-warning">Ranch</span>🐱 - Tutti i
                  diritti riservati
                </p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
