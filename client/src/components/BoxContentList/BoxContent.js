import React from "react";
import "./BoxContent.css";

export const BoxContent = ({ children }) => {
    return (
        <div id="list-box">
        <ul>
            { children }
        </ul>
        </div>
    )
}