import React from "react";
import Navbar from "../navigation/Navbar";
import Footer from "../footer/Footer";
import ActionBar from "../actionBar/ActionBar";

const BaseLayout = ({ children }) => {
  return (
    <>
      <div>
        <Navbar />
        <ActionBar />
      </div>

      {children}
      <Footer />
    </>
  );
};

export default BaseLayout;
