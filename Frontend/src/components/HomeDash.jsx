import React from "react";
import { Button } from "react-bootstrap";
import '../App.css';
import { Link, useNavigate } from "react-router-dom";
export default function HomeDash(){

    return(<>
     
    <div  id="home-bg" className="d-flex flex-row min-vh-100 justify-content-center  text-light align-items-center ">
    
    <div id="home-image" className="flex-fill h-100 w-50 ">
   
  </div>

        <div className="d-flex flex-column  justify-content-center align-items-center w-50">
            <h2 className="text-info d-flex flex-row mb-4">Login to Make Todos</h2 >
            <Link to='/login' className="btn btn-outline-dark btn-lg">Login</Link>

        </div>
        </div>
    
    </>);
}