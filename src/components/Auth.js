import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router";

function Auth({ data }) {
const navigate = useNavigate();
React.useEffect(()=>{
    setTimeout(() => {
       navigate(`/start`);
    }, "4000");

})
    return (
      <div>
        <h1>Authorize...</h1>
        <LoadingSpinner />
      </div>
    );
    
  
}

export default Auth;
