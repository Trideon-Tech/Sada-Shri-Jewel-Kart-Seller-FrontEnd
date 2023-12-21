import React from "react";

import "./registration-outline-component.styles.scss";

const RegistrationOutlineComponent = ({ number, text, showTrailingLine }) => {
  return (
    <div className="registration-outline-item">
      <div className="contents">
        <div className="number">{number}</div>
        <div className="text">{text}</div>
      </div>
      {showTrailingLine ? <div className="dotted-line" /> : <div />}
    </div>
  );
};

export default RegistrationOutlineComponent;
