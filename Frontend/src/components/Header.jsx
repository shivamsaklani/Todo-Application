import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Button, NavbarBrand, NavLink } from 'react-bootstrap';
import NavbarText from 'react-bootstrap/NavbarText';
import  Navbar  from 'react-bootstrap/Navbar';
import Mobileslider from './mobileslider';
import { Link, useNavigate } from 'react-router-dom';
import {Glogin,User} from '../App';
import { useRecoilState } from 'recoil';

function Signed(props){
 
    return (
     <NavbarText className='  text-white'>
        Welcome <a className='text-info text-decoration-none' href="#login">{props.user}</a>
      </NavbarText>
    );
}


 

function CustomHeader() {
  const [login,setlogin]=useRecoilState(Glogin);
 let [user,setUser]=useRecoilState(User);
  function logout(){
    setUser('');
    setlogin(false);
    localStorage.removeItem('key');
    
    
    
  }

  return (
    <Navbar bg='dark' sticky='top' expand='lg' className="align-items-center justify-content-between">
    
      <Container className='justify-content-between'>
      {login && <Mobileslider/>} 
        <Link to='/' className='text-white'>Todo Application </Link>
        <NavbarText className='justify-content-center align-items-center fs-6 text-light btn btn-outline-info'><NavLink className='shadow-sm text-light ' href="/login">Login</NavLink></NavbarText>
        
        {login &&
        <NavbarText className='d-none d-lg-block d-xl-block'><Signed  user={user}/>
        <Button className='btn btn-danger' onClick={logout}> Logout </Button></NavbarText>  }

       

      </Container>
    </Navbar>
  );
}

export {CustomHeader,Signed};