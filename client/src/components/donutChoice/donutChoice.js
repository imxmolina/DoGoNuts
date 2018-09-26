import React from "react";

export const DonutChoice = ({ children }) => {
    return (
        <div className="list-overflow-container">
        <ul clasName="list-group">
            {children}
        </ul>
        </div>
    );
}