import { createContext, useContext, useEffect, useState } from "react";

const AnimalContext = createContext();

export const AnimalProvider = ({ children }) => {
  const [animals, setAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllAnimals = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/animals`
      );
      const data = await response.json();
      console.log(data);

      setAnimals(data.animals);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllAnimals();
  }, []);

  return (
    <AnimalContext.Provider value={{ animals, getAllAnimals, isLoading }}>
      {children}
    </AnimalContext.Provider>
  );
};

export const useAnimals = () => useContext(AnimalContext);
