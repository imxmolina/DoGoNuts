import React from "react";
import "./SelectBox.css";

export const SelectBox = props => {

  return (
    <div className="dropdown">
      <ul className="dropdown-item">
        {props}
      </ul>
    </div>
  )
};
