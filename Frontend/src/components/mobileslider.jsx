import React, { useState } from "react";
import { Button, CardFooter, Nav, NavItem, NavLink, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasToggling } from "react-bootstrap";
import { Signed } from "./Header";
import { useRecoilState } from "recoil";
import { GrClose } from "react-icons/gr";
export default function Mobileslider() {
    const [show, setshow] = useState(false);
    const closeSlider = () => setshow(false);
    const openSlider = () => setshow(true);
  let user=useRecoilState(User);
   function logout(){
     
   
     closeSlider();
     localStorage.removeItem('key');
     localStorage.setItem('user',false);
     
     
     
   }

    return (<>

        <div className="justify-content-start align-items-start">
            <Button variant="dark" className="mr-3 d-sm d-md-none" onClick={openSlider}>☰</Button>
            <Offcanvas show={show} className="bg-secondary" onHide={closeSlider} placement="start" >
            <OffcanvasHeader className="justify-content-start bg-dark fs-3 font-monospace">
  <Signed user={user} />
  <GrClose className="text-light ms-auto" onClick={closeSlider} />
</OffcanvasHeader>

                <OffcanvasBody className="justify-content-center align-self-center">

                <Nav className="flex-column align-self-start align-items-center w-100">
                    <NavItem className=" text-light w-100 mb-5 ">
                    <NavLink  href="/home">Home</NavLink>
                            
                    </NavItem>
                    <NavItem className="list-group-item list-group-item-action canvas-items text-light w-100 mb-5 ">
                    <NavLink >Categories</NavLink>
                           
                    </NavItem>
                    <NavItem className="list-group-item list-group-item-action canvas-items text-light w-100 mb-5 ">
                    <NavLink  href="#">Add Todos</NavLink>
                                 
                    </NavItem>
                    <NavItem className="list-group-item list-group-item-action canvas-items text-light w-100 mb-5 ">
                    <NavLink href="#">Calendar</NavLink>
                                  
                    </NavItem>
                    <NavItem className="list-group-item list-group-item-action canvas-items text-light w-100 mb-5 ">
                    <NavLink href="#">Profile</NavLink>
                             
                    </NavItem>
                             </Nav>

                </OffcanvasBody>
                <hr className="mb-4 text-light" />
                <CardFooter className="text-light align-self-center" onClick={logout}>
                    Logout
                </CardFooter>

            </Offcanvas>

        </div>
    </>)

}