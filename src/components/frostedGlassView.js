import { React, useState, useEffect } from "react";
import "../css/frosted.scss";



function FrostedGlassView(props){
  const bgImage = props.BgImage;
  const bgImageValue = `url(${bgImage})`;
    return (
      <div
        style={
          !props.disabled
            ? { backgroundColor: bgImageValue, backgroundImage: bgImageValue }
            : {}
        }
        className={
          "bg frosted-glass " +
          (props.className ? props.className : "")
        }
      >
        <div className="frosted-glass-content">{props.children}</div>
      </div>
    );
  
}

export default FrostedGlassView;
