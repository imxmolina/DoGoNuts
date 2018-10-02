import React from "react";
import "./CreateBox.css";

export const CreateBox = props => {
  console.log("CreateBox props: " + props.handleCreateBox);
  return (
    <div>
      <div id="create-box-wrapper">
        <input id="create-box-input" className="form-control-inline" type="text" placeholder="Group Name" />
        <button id="create-box-btn" type="button" className="btn-inline btn-success" onClick={() => props.handleCreateBox(document.getElementById('create-box-input').value)}>Create a Box</button>

      </div>
    </div>
  )
};
