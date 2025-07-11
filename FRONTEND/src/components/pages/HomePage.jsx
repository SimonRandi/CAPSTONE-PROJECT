import React from "react";
import BaseLayout from "../layout/BaseLayout";
import Headers from "../headers/Headers";
import IntroSection from "../introSection/IntroSection";
import { useEffect } from "react";
import RecentAnimals from "../recentAnimals/RecentAnimals";

const HomePage = () => {
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);
  return (
    <>
      <BaseLayout>
        <Headers />
        <IntroSection />
        <RecentAnimals />
      </BaseLayout>
    </>
  );
};

export default HomePage;
