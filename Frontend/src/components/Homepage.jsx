import React from "react";
import { CustomHeader } from "./Header";
import Authpage from './Authpage';
import UserDashboard from './MainDashboard';
import {createBrowserHistory} from 'history';
import {BrowserRouter, Route, Routes ,} from 'react-router-dom';
import HomeDash from "./HomeDash";
export const history=createBrowserHistory();
export default function Homepage() {
    return (

<BrowserRouter history={history}>

        <div className="d-flex flex-column min-vh-100">

            <CustomHeader />
            <div className="flex-fill">

                
            
                    <Routes>
                        <Route path="/" element={<HomeDash/>}/>
                        <Route>
                            <Route path="login" element={<Authpage />} />
                            <Route path="home" element={<UserDashboard />} />

                        </Route>
                    </Routes>
              
            </div>
            <div className="bg-dark  text-light d-flex justify-content-center align-items-center">
                Footer
            </div>


        </div>
        </BrowserRouter>

    );
}
