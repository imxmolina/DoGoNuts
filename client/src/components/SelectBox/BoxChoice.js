import React from "react";

export const BoxChoice = props => (
    <li onClick={() => props.handleClick(props.box_id)} className="list-group-item">
        {props.children}
    </li>
);