import { BrowserRouter, Route, Routes } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import HomePage from "./components/pages/HomePage";
import DogByRacePage from "./components/pages/DogByRacePage";
import DogByBreed from "./components/pages/DogByBreed";
import DogByAge from "./components/pages/DogByAge";
import AllDogsPage from "./components/pages/AllDogs";
import CatByRace from "./components/pages/CatByRace";
import AllCatsPage from "./components/pages/AllCats";
import CatByAge from "./components/pages/CatsByAge";
import AnimalDetails from "./components/pages/AnimalDetails";
import Registration from "./components/pages/registration/Registration";
import Login from "./components/pages/login/Login";
import Dashboard from "./components/pages/dashboard/Dashboard";
import VerificationEmailPage from "./components/pages/verificationEmail/VerificationEmailPage";
import AboutUsPage from "./components/pages/aboutUs/AboutUsPage";
import NotFoundPage from "./components/pages/notFoundPage/NotFoundPage";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<HomePage />}></Route>
          <Route path="/signup" element={<Registration />}></Route>
          <Route
            path="/verify-email"
            element={<VerificationEmailPage />}
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/animals/:id" element={<AnimalDetails />}></Route>
          <Route path="/dogs" element={<AllDogsPage />}></Route>
          <Route path="/dogs/race" element={<DogByRacePage />}></Route>
          <Route path="/dogs/breed" element={<DogByBreed />}></Route>
          <Route path="/dogs/age" element={<DogByAge />}></Route>
          <Route path="/cats" element={<AllCatsPage />}></Route>
          <Route path="/cats/race" element={<CatByRace />}></Route>
          <Route path="/cats/age" element={<CatByAge />}></Route>
          <Route path="/about-us" element={<AboutUsPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
