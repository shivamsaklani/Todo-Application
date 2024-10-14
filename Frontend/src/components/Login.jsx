import { Button, Container, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Form } from "react-bootstrap";
import {React, useEffect, useState} from "react";
import axios from "axios";
import '../App.css'
import { Navigate } from "react-router";
import {  useRecoilState } from 'recoil';
import { Glogin,User } from "../App";


function Loginform(){
    const [email,setmail]=useState('');
    const [login,setlogin]=useRecoilState(Glogin);
    let user=useRecoilState(User);
    const [password,setpassword]=useState('');
   const  signin=async ()=>{
    
     
     await axios.post("http://localhost:3001/signin", {
        email: email,
        password: password
      })
      .then((response) => {
        if(!response.error){
          setlogin(true);
          user=email;
        }
        let token;
     
        
          token = response.headers['token'];
      
          localStorage.setItem('key', token);

      
       
       
        
        
       
      })
      .catch(error => {
        console.error("There was an error during login:", error);
      });
      

   }
 
   if(login){
    return <Navigate to="/home" />
  }   
  
    
  
    return(
        <Container >

            <Form>
                
                <FormGroup className="mb-3" controlId="formBasicEmail">
               
                <FormControl bsPrefix="login-control" className="mb-3 " onChange={(e)=>setmail(e.target.value) } type="email" placeholder="Enter Email"/>
                </FormGroup>
        
                <FormGroup>
                
                <FormControl bsPrefix="login-control" className="mb-3 " onChange={(e)=>setpassword(e.target.value)}  type="password"  placeholder="Enter Password"/>
                </FormGroup>
               
               
                <Button  variant="dark" size="lg" className="mt-20" onClick={(e)=>{
                  e.preventDefault();
                  signin();} }>Submit</Button>
            </Form>
            </Container>
    );
  
    
}

export default Loginform;