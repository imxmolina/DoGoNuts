import React from "react";
import "./boxItems.css";

export const BoxItems = props => (
        <div className="img-container remove" onClick={() => props.removeDonut(props._id)}>
            {props.children}
        </div>
);
