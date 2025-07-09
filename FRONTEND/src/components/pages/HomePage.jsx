import React from "react";
import BaseLayout from "../layout/BaseLayout";
import Headers from "../headers/Headers";
import IntroSection from "../introSection/IntroSection";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);
  return (
    <>
      <BaseLayout>
        <Headers />
        <IntroSection />
      </BaseLayout>
    </>
  );
};

export default HomePage;
