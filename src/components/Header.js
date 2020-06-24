import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { UserContext } from './Providers/UserProvider';

function Header() {
    let user = useContext(UserContext);
    
    return(
        <>
            <Navbar collapseOnSelect expand="md" bg="primary" variant="dark">
                <Navbar.Brand href="/">Impact Without Contact</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                <Nav className="ml-auto">
                    {user ? (<>
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/opportunities">Opportunities</Nav.Link>
                        <Nav.Link href="/signout">Sign Out</Nav.Link>
                    </>) : (<>
                        <Nav.Link href="/signup">Sign Up</Nav.Link>
                        <Nav.Link href="/login">Log In</Nav.Link>
                    </>)}
                </Nav>
                </Navbar.Collapse>
                
            </Navbar>
        </>
    );
}

export default Header;