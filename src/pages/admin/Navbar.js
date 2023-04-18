import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Dropdown, Badge } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaBell, FaUserAlt, FaUserPlus, FaAccusoft } from 'react-icons/fa';
import { notifications, DeconnexionUsers } from "../../services/Data";
import { useLocation, Link } from 'react-router-dom';
import { AiOutlineDashboard } from 'react-icons/ai'
import { GiArchiveRegister } from 'react-icons/gi'
import { Connectivite } from '../../services/Connectivité';
import { AdminById } from "../../services/Data";

function NavigationbarAdmin() {
    const allnotifications = notifications();
    const notificationCount = allnotifications.length;
    const location = useLocation();

    return (
        <Navbar bg="primary" expand="xxl" sticky="top" className="mb-2">
            <Container>
                <div className='d-flex'>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xxl`} />
                    <Link to='/Admin'>
                        <Navbar.Brand className="text-light fw-bolder fst-italic display-6 d-none d-md-flex ms-3" action to={'/Admin'}>Fitness</Navbar.Brand>
                    </Link>
                </div>
                <div className='d-flex'>
                    <Dropdown drop="start">
                        <Dropdown.Toggle variant="transparent" id="notification-dropdown">
                            <FaBell className='text-light' />
                            {notificationCount > 0 && <Badge bg="danger">{notificationCount}</Badge>}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {allnotifications.map((notification) => (
                                <Dropdown.Item key={notification.id}>
                                    {notification.title}{' '}
                                    <span className="text-muted">- {notification.date}</span>
                                </Dropdown.Item>
                            ))}
                            {notificationCount > 0 && <Dropdown.Divider />}
                            <Dropdown.Item href="#">Voir toutes les notifications</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle variant="transparent" className="border border-light text-light" id="notification-dropdown">
                            <FaUserAlt className='me-1' />{AdminById(Connectivite().userId) ? AdminById(Connectivite().userId).prenom+' '+AdminById(Connectivite().userId).nom : 'Admin'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item className='d-flex' action to={''}>
                                Profil
                            </Dropdown.Item>
                            <Dropdown.Item className='d-flex text-danger' action onClick={DeconnexionUsers}>
                                Déconnexion
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-xxl`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-xxl`}
                    placement="start" className="bg-primary" >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xxl`} className="text-light fw-bolder fst-italic display-6">
                            Fitness
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 px-3 text-light">
                            <Nav.Link href="/Admin" style={location.pathname === '/Admin' ? { marginBottom: '10px', color: '#1DC7EA' } : {}}><AiOutlineDashboard className="me-2" />Tableau de bord</Nav.Link>
                            <Nav.Link href="/Admin/abonnements" style={location.pathname === '/Admin/abonnements' ? { marginBottom: '10px', color: '#1DC7EA' } : {}}><FaAccusoft className="me-2" />Abonnements</Nav.Link>
                            <Nav.Link href="/Admin/abonnements/Ajout" style={/^\/Admin\/abonnements\/Ajout/.test(location.pathname) ? { marginBottom: '10px', color: '#1DC7EA' } : {}}><GiArchiveRegister className="me-2" />Ajout Abonnements</Nav.Link>
                            <Nav.Link href='/Admin/abonne' style={location.pathname === '/Admin/abonne' ? { marginBottom: '10px', color: '#1DC7EA' } : {}}><FaUserAlt className="me-2" />Abonné(e)s</Nav.Link>
                            <Nav.Link href='/Admin/abonne/Ajout' style={/^\/Admin\/abonne\/Ajout/.test(location.pathname)  ? { marginBottom: '10px', color: '#1DC7EA' } : {}}><FaUserPlus className="me-2" />Ajout Abonné(e)</Nav.Link>
                            {/* <Nav.Link href="/Admin/abonnements" style={location.pathname === '/Admin/abonnements' ? { marginBottom: '10px', color: '#1DC7EA' } : {}}>Abonnements</Nav.Link> */}
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default NavigationbarAdmin;