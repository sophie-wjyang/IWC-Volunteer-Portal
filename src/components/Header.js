import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from '../assets/iwc-logo';
import app, { db } from './Firebase';

function Header() {
    const [user, setUser] = useState(null);
    const [pending, setPending] = useState(true);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        app.auth().onAuthStateChanged(user => {
            setUser(user);
            if (user) {
                db.collection("users").doc(`${user.uid}`).get().then(doc => {
                    setAdmin(doc.data().admin);
                })
            }
            setPending(false);
        })
    }, []);

    if (pending) {
        return <Navbar collapseOnSelect expand="md" bg="light" variant="light">
            <Navbar.Brand href="/"><img src={Logo} alt="Impact Without Contact Logo" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="ml-auto"></Nav>
            </Navbar.Collapse>
        </Navbar>;
    }

    return (
        <>
            <Navbar collapseOnSelect expand="md" bg="light" variant="light">
                <Navbar.Brand href="/"><img src={Logo} alt="Impact Without Contact Logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ml-auto">
                        {admin ? (<>
                            <Nav.Item>
                                <Nav.Link href="/admin">Admin</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/opportunities">Opportunities</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/tracker">Tracker</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/signout">Sign Out</Nav.Link>
                            </Nav.Item>
                        </>) : (<>{user ? (<>
                            <Nav.Item>
                                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/opportunities">Opportunities</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/tracker">Tracker</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/signout">Sign Out</Nav.Link>
                            </Nav.Item>
                        </>) : (<>
                            <Nav.Item>
                                <Nav.Link href="/signup">Sign Up</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/login">Log In</Nav.Link>
                            </Nav.Item>
                        </>)}</>)}
                        {}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );

    /*let user = useContext(UserContext);

    return (
        <>
            <Navbar collapseOnSelect expand="md" bg="light" variant="light">
                <Navbar.Brand href="/"><img src={Logo} alt="Impact Without Contact Logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ml-auto">
                        {}
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
    );*/
}

export default Header;