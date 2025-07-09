import React, { useEffect } from "react";
import { useAnimals } from "../context/AnimalContext";
import Spinner from "react-bootstrap/Spinner";

import SingleAnimal from "../singleAnimal/SingleAnimal";

const AnimalPosts = () => {
  const { animals, getAllAnimals, isLoading } = useAnimals();
  console.log(animals);

  useEffect(() => {
    getAllAnimals();
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mt-4">
        <Spinner animation="grow" />
        Loading..
      </div>
    );
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row ">
          {animals.length > 0 ? (
            animals.map((animal) => (
              <SingleAnimal key={animal._id} animal={animal} />
            ))
          ) : (
            <p>Nessun animale trovato!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AnimalPosts;
