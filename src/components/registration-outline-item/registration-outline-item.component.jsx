import React from "react";
import { Done } from "@mui/icons-material";

import "./registration-outline-item.styles.scss";

const RegistrationOutlineComponent = ({
  number,
  text,
  showTrailingLine,
  selectedIndex,
}) => {
  return (
    <div className="registration-outline-item">
      <div className="contents">
        {selectedIndex > number ? (
          <Done className="checked" />
        ) : (
          <div className="number">{number}</div>
        )}
        <div className="text">{text}</div>
      </div>
      {showTrailingLine ? <div className="dotted-line" /> : <div />}
    </div>
  );
};

export default RegistrationOutlineComponent;
