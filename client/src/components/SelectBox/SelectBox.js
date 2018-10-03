import React from "react";
import "./SelectBox.css";

export const SelectBox = ({ children }) => {

  return (
    <div className="list-overflow-container menu">
      <ul className="list-group-item">
        {children}
      </ul>

    </div>

  )
};
