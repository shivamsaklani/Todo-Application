import React from 'react';
import Container  from 'react-bootstrap/Container';
import  Row  from 'react-bootstrap/Row';
import  Col  from 'react-bootstrap/Col';
import Loginform from './Login';
import '../App.css';


export default function Authpage(){
    return (
        <Container className='d-flex justify-content-center align-items-center min-vh-100 pd-10'>
        <Row id="authpage" className='w-100'>
        
          <Row className='justify-content-between align-items-center'>
            
          <Col >
              <Container id="background-image" className=' d-flex justify-content-center align-items-center'>
                {/* Add content or image here */}
              </Container>
            </Col>
            <Col md={6} className='flex flex-column justify-content-center align-items-center'>
            <p className='fs-2 fs-md-5 mb-3 text-black-80 font-monospace'>Login to Create Todos</p>
       
            <Loginform />
      
             
            </Col>

           
          </Row>
        </Row>
      </Container>
      
    );
}