import React from "react";
import "./CreateBox.css";
 export const CreateBox = ({ children }) => {
  return (
    <div>
      <div id="create-box-wrapper">
        <input id="create-box-input" className="form-control-inline" type="text" placeholder="Group Name" /><button id="create-box-btn" type="button" className="btn-inline btn-success">Create a Box</button>
       </div>
    </div>
  )
};