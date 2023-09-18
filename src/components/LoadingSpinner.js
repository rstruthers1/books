
import React from "react";
import {Spinner} from "react-bootstrap";

const LoadingSpinner = props => {
  const style = { position: "fixed", top: "40%", left: "50%", transform: "translate(-40%, -50%)" };
  return (
    <div style={style}>
        <Spinner animation="border" role="status" style={{ width: "4rem", height: "4rem" }}/>
    </div>
  );
};

export default LoadingSpinner;