import React from "react";
// import Slider from "react-slick";
import "./boxContainer.css";

export const BoxContainer = ({children}) => {
    return (
        <div className="boxContainer" onChange={this.renderDonutCount}>{children}</div>
    );   
}

