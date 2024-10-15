import React from "react";
import { Outlet } from "react-router";
import { CustomHeader } from "./Header";
import Authpage from './Authpage';
import UserDashboard from './MainDashboard';

import {BrowserRouter,Route, Routes} from 'react-router-dom';
export default function Homepage() {
    return (
             
   
      
        <div className="d-flex flex-column min-vh-100">
           
          <CustomHeader/>  
            <div className="flex-fill">
            
  
         <Outlet/>
            <BrowserRouter> 
        <Routes>
        <Route path="/" element={<Outlet/>}>
        <Route  path="login" element={<Authpage/>} />
        <Route path="home" element={<UserDashboard/>}/>
       
        </Route>
      </Routes>
</BrowserRouter>
            </div>
            <div className="bg-secondary text-light d-flex justify-content-center align-items-center">
                Footer
            </div>
          
         
        </div>
        
    );
}
