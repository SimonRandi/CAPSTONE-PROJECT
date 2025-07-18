import React from "react";
import BaseLayout from "../../layout/BaseLayout";
import notFound from "../../../../img/404.png";
import "../notFoundPage/notFoundPage.css";

const NotFoundPage = () => {
  return (
    <>
      <BaseLayout>
        <div className="container-not-found">
          <img className="img-fluid" src={notFound} alt="" />
        </div>
      </BaseLayout>
    </>
  );
};

export default NotFoundPage;
