//Heroku Version
import React from "react";
import "./boxContainer.css";

export const BoxContainer = ({children}) => {
    return (
        <div className="boxContainer" onChange={this.renderDonutCount}>{children}</div>
    );   
}

