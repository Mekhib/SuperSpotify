import React from "react"
import { Navigate, Outlet } from "react-router-dom";
import { loggedIn } from "../js/user.js";
import Home from "./Home";

const LoggedIn = ({children}) => {
  var willRenderHome = false
//  let navigate = useNavigate()
 let token = window.localStorage.getItem("token");
 if (token) {
   const isLoggedIn = loggedIn.then(({ statusCode }) => {
     console.log("statusCode", statusCode);
     if (statusCode === 401) {
       localStorage.clear();
       alert(
         "Looks like the session has expired, You may have to login again."
       );
       return willRenderHome = true
     } else {
     return (willRenderHome = false);
     }
   });
 } else {
   return <Navigate to={"/"}/>
 }
 return <div>{willRenderHome ? <Navigate to={"/"} /> : children}</div>; 
}
 


export default LoggedIn
