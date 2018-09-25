import React from "react";

export const donutChoice = ({ children }) => {
    return (
        <div className="list-overflow-container">
        <ul clasName="list-group">
            {children}
        </ul>
        </div>
    );
}