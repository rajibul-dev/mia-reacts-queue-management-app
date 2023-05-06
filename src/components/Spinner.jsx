import React from "react";
import Loading from "react-loading";

const size = 120;
import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner">
      <Loading type={"spin"} color={"#ffffff"} height={size} width={size} />
      <p>Loading...</p>
    </div>
  );
};

export default Spinner;
