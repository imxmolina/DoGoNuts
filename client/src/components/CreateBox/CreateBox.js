import React from "react";
import "./CreateBox.css";

export const CreateBox = props => {
  // console.log("CreateBox props: " + props);
  return (
    <div>
      <div id="create-box-wrapper">
      <h3 className="instructions">Name Your Box</h3>
      <input id="create-box-input" className="form-control-inline" type="text" placeholder="Group Name" />
        <button id="create-box-btn" type="button" className="btn-inline btn-success" onClick={() => props.handleCreateBox(document.getElementById('create-box-input').value)}>GO!</button>
      </div>
    </div>
  )
};