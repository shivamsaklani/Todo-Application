import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import '../App.css';
export default function CustomFooter(){
    return(
        <>
        <Container className="footer-container p-4 bg-secondary w-100">
           <Row>
                <Col>
                Home
                </Col>
            </Row>

        </Container>
        </>
    );
}