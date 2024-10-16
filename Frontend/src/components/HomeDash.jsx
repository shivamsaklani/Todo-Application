import React from "react";
import { Button } from "react-bootstrap";
import '../App.css';
import { Link, useNavigate } from "react-router-dom";
export default function HomeDash(){

    return(<>

    <div  id="home-bg" className="d-flex flex-row w-100 min-vh-100  text-light  justify-content-center align-items-center">
        
        <div className="d-flex flex-column">
            <h1 className="text-info d-flex flex-row mb-4">Login to Make Todos</h1>
            <Link to='/login' className="btn btn-outline-dark bsSize-md">Login</Link>

        </div>
        </div>
    
    </>);
}