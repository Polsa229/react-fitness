import { Connectivite } from '../../services/Connectivité';
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Badge, Button, Card, Navbar, Nav, Table, Container, Row, Col, Form, OverlayTrigger, ListGroup, ListGroupItem } from "react-bootstrap";
import NavigationbarAdmin from './Navbar';
import CanvasJSReact from './canvasjs.react';
import { notifications, CourbeAbonnements, abonnementsTotal, abonnementsDelivréMois, abonnementsActifTotal, abonnementsExpireMois, prixAbonnementsTotal } from "../../services/Data";
import { prixAbonnementsActifTotal, prixAbonnementsDelivréMois, prixAbonnementsExpireMois, getNonExpiredAbonnements, UsersById, typeAbonnementsById, getExpireSoonAbonnements } from "../../services/Data";
import { useLocation, Link } from 'react-router-dom';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Dashboard() {
    Connectivite();
    const allnotifications = notifications().slice(0, 5);
    const options = CourbeAbonnements();

    const abonnementstotal = abonnementsTotal();
    const prix_abonnements_total = prixAbonnementsTotal();

    const abonnementsActiftotal = abonnementsActifTotal();
    const prix_abonnements_actif_total = prixAbonnementsActifTotal();

    const abonnementsMois = abonnementsDelivréMois();
    const prix_abonnements_mois = prixAbonnementsDelivréMois();

    const abonnements_expire_mois = abonnementsExpireMois();
    const prix_abonnements_expire_mois = prixAbonnementsExpireMois();

    const allNonExpireAbonnements = getNonExpiredAbonnements() ? getNonExpiredAbonnements().slice(0, 5) : {};
    const AllAbonnementsExpireSoon = getExpireSoonAbonnements();
    return (
        <>
            <NavigationbarAdmin />
            <Container fluid className="mb-3">

                <Row xxs={1} xs={2} sm={2} md={4} className="g-4 mb-3">
                    <Col >
                        <Card border="primary" className="h-100">
                            <Card.Header className="h-100 d-block align-item-center">Total abonnements</Card.Header>
                            <Card.Body className="d-block align-item-center justify-content-center">
                                <Card.Title className="text-center">
                                    {abonnementstotal} <sup>Abonnement(s)</sup>
                                </Card.Title>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-center text-primary">
                                {prix_abonnements_total} <sub>XOF</sub>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col>
                        <Card border="warning" className="h-100">
                            <Card.Header className="h-100 d-block align-item-center">Abonnements fait ce mois</Card.Header>
                            <Card.Body className="d-block align-item-center justify-content-center">
                                <Card.Title className="text-center">
                                    {abonnementsMois} <sup>Abonnement(s)</sup>
                                </Card.Title>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-center text-warning">
                                {prix_abonnements_mois} <sub>XOF</sub>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col>
                        <Card border="primary" className="h-100">
                            <Card.Header className="h-100 d-block align-item-center">Total abonnements actif(s)</Card.Header>
                            <Card.Body className="d-block align-item-center justify-content-center">
                                <Card.Title className="text-center">
                                    {abonnementsActiftotal} <sup>Abonnement(s)</sup>
                                </Card.Title>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-center text-primary">
                                {prix_abonnements_actif_total} <sub>XOF</sub>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col>
                        <Card border="warning" className="h-100">
                            <Card.Header className="h-100 d-block align-item-center">Abonnements expirant ce mois</Card.Header>
                            <Card.Body className="d-flex align-items-center text-center h-100">
                                <Card.Title >
                                    {abonnements_expire_mois} <sup>Abonnement(s)</sup>
                                </Card.Title>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-center text-warning">
                                {prix_abonnements_expire_mois} <sub>XOF</sub>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
                <Row className="g-4">
                    {/* Courbe des abonnements des 12 dernier mois  */}
                    <Col md="12">
                        <Card>
                            <Card.Body>
                                <CanvasJSChart options={options} />
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* Liste des 5 derniers abonnements */}
                    {
                        Object.keys(allNonExpireAbonnements).length !== 0 ?
                            <Col md="12">
                                <Card>
                                    <Card.Header className="bg-primary fw-bolder text-light">Abonnements</Card.Header>
                                    <ListGroup variant="flush">
                                        {allNonExpireAbonnements.map((abonnement) => (
                                            <Link to={`/Admin/abonnements/${abonnement.id}`} className="text-decoration-none">
                                                <ListGroupItem key={abonnement.id} action to={`/Admin/abonnements/${abonnement.id}`} className="d-flex justify-content-between">
                                                    <span className="d-flex col-5 text-truncate"><span className='me-2 text-uppercase'>{UsersById(abonnement.users).prenom}</span>{UsersById(abonnement.users).nom}</span>
                                                    <span className="text-primary fw-bolder text-uppercase fst-italic">{typeAbonnementsById(abonnement.type).nom}</span>
                                                    <span className="text-muted fst-italic">Expire le {abonnement.dateExpire}</span>
                                                </ListGroupItem>
                                            </Link>
                                        ))}
                                        <Link to={`/Admin/abonnements`} className="text-decoration-none">
                                            <ListGroupItem className="text-center">
                                                Voir tous les abonnements
                                            </ListGroupItem>
                                        </Link>
                                    </ListGroup>
                                </Card>
                            </Col> : ''
                    }
                    <Col md="12">
                        <Card>
                            <Card.Header className="bg-primary fw-bolder text-light">Notifications</Card.Header>
                            <ListGroup variant="flush">
                                {allnotifications.map((notification) => (
                                    <ListGroupItem key={notification.id} action to={`/notifications/${notification.id}`} className="d-flex justify-content-between">
                                        <span className="fw-bold col-5 text-truncate">{notification.title}{' '}</span>
                                        <span className="text-muted fst-italic">{notification.date}</span>
                                    </ListGroupItem>
                                ))}
                                <ListGroupItem action to="/notifications" className="text-center">
                                    Voir toutes les notifications
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
export default Dashboard;
