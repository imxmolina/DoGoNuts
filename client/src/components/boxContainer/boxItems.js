import React from "react";
import "./boxItems.css";

export const BoxItems = props => (
        <div className="img-container" onClick={() => props.removeDonut(props.donut_id)}>
            {props.children}
        </div>
);
