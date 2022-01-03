import React from "react";
import ReactDOM from "react-dom";
import "./Backdrop.css";

const Background = () => {
  return <div className="backdrop"></div>;
};

const Backdrop = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <Background />,
        document.getElementById("backdrop-root")
      )}
    </>
  );
};

export default Backdrop;
