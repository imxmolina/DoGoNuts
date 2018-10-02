import React from "react";
import "./SelectBox.css";

export const SelectBox = props => {
  console.log("SelectBox Props: " + props);
  return (
    <div>
      <div id="select-box-wrapper">
        <button id="create-box-btn" type="button" className="btn-inline btn-success" onClick={() => props.handleSelectBox(document.getElementById('select-box-input').value)}>Select a Box</button>

      </div>
    </div>
  )
};
