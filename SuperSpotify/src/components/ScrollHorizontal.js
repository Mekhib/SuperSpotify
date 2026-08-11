import { React, useState, useEffect } from "react";
import "../css/scrollContainer.css"


function ScrollContainer({children}) {
    return (
        <div className="scroll-wrapper"> 
            {children}
        </div>
    )
}

export default ScrollContainer