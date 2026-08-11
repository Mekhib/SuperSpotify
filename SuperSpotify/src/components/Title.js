import React from "react";
import "../css/title.css";

const Title = ({ text }) => {
    return (
        <div className="section-title-container">
            <h3 className="section-title">{text}</h3>
        </div>
    );
};

export default Title;