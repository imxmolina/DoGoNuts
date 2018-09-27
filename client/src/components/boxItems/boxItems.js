import React from "react";

export const BoxItems = props => (

    <div className="card">
        <div className="img-container remove" onClick={() => props.removeDonut(props.id)} >
            <img alt={props.name} src={props.image} />
        </div>
        <div className="content">
            <ul>
                <li>
                    <strong>Name:</strong> {props.name}
                </li>
            </ul>
        </div>
    </div>
);