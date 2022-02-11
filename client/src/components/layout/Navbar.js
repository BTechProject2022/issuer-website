import React,{Component} from "react";
import {Link} from "react-router-dom";
import { Button , Container , Navbar , Nav } from "react-bootstrap";
import { useSelector } from 'react-redux'
import { logoutUser } from "../../actions/authActions";

const NavBar = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const isAdmin = useSelector(state => state.auth.user.isAdmin );

    const onLogout = (e) =>{
        e.preventDefault();
        logoutUser();
    }
    return(
        <>
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/"><h4>College Website</h4></Navbar.Brand>
            {
                isAuthenticated && 
                <Nav className="me-auto">
                    { !isAdmin && <Nav.Link href="/dashboard">Dashboard</Nav.Link> }
                    { isAdmin && <Nav.Link href="/createSchema">Create Schema</Nav.Link> }
                </Nav>
            }
            </Container>
        </Navbar>
        </>
    ) 
}

export default NavBar;