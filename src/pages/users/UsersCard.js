// @flow strict

import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Card, ListGroup, Container, Row, Col } from 'react-bootstrap';
import Chance from 'chance';
import { AllTypeAbonnements, InfoSalle, AllAbonnements, UsersById, typeAbonnementsById, AllUsers } from "../../services/Data";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const UserCard = () => {

    // Récupérer l'id en paramètre
    const { id } = useParams();

    let compte = 0;
    const abonnements = AllAbonnements();
    for (let i = 0; i < abonnements.length; i++) {
        if (abonnements[i].id == parseInt(id)) {
            compte++
            break
        }
    }
    if (compte == 0) {
        window.location.href = "/";
    }

    const chance = new Chance();

    // Informations Compagnie 
    const Compagnie = {
        // photo : '../../Images/Userprofil.png', 
        nom: 'Compagnie Name',
        email: 'email@example.com',
        telephone: '+33 6 12 34 56 78',
        adresse: '12 rue de la compagnie',
        activite: 'Muscu , Fitness , Gymnastique, Yoga, Pilates, Crossfit, Zumba, Bodybuilding, Cardio'
    };
    // const Compagnie = InfoSalle()
    // Récupérer les informations de l'utilisateur
    const users = AllUsers();
    const filteredUsers = users.filter(user => user.id == id);
    console.log(filteredUsers)
    // filteredUsers.forEach(user => {
    //     const member = {
    //         nom: user.nom.toUpperCase(),
    //         prenom: user.prenom.slice(1),
    //         email: user.email,
    //         telephone: user.telephone,
    //         photo: user.image,
    //     };
    //     return member;
    // });
    // generate random member data

    // Options d'affichage de la date
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    // generate random abonnement data
    const abonnement = AllAbonnements();

    return (
        <div>
            <Container className="m-3 d-block justify-content-center align-items-center" fluid>
                <Row className="justify-content-center align-item-center h-100 w-100  mx-5">
                    <Col className="text-center">
                        <Card style={{ maxWidth: '700px' }}>
                            <Card.Header className='w-100 bg-transparent border border-bottom-0'>
                                <Row className="d-flex justify-content-between align-items-center">
                                    <Col className='d-flex'>
                                        <i className='fw-bolder'>{Compagnie.nom}</i>
                                    </Col>
                                    <Col className="align-items-center text-end">
                                        <p><span className='text-muted'>Id : </span><strong> {abonnement.idAbonnement}</strong></p>
                                        <span className="text-muted">{abonnement.dateAbonnement}</span>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <>
                                {filteredUsers.map(user => (
                                    <Row className="d-flex justify-content-between align-items-center">
                                        <Col xs={5} md={4} className="text-center">
                                            <Card.Img variant="top" src='../../Images/Userprofil.png' className="rounded-start" alt={(user.nom) + (user.prenom)} />
                                        </Col>
                                        <Col xs={7} md={8} className="text-center">
                                            <hr className='fw-bolder' />
                                            <Card.Body className='h-100'>
                                                <Card.Title>{user.nom} {user.prenom}</Card.Title>
                                                <h6 className='text-center text-primary'>{abonnement.typeAbonnement}</h6>
                                                <Card.Text>
                                                    <p className='text-center'>
                                                        {user.email}
                                                    </p>
                                                    <p className='text-center'>
                                                        {user.telephone}
                                                    </p>
                                                </Card.Text>
                                            </Card.Body>
                                            <hr className='fw-bolder' />
                                        </Col>
                                    </Row>
                                ))
                                }
                            </>
                            <Card.Footer>
                                <small className="text-muted">Expire le {abonnement.dateExpiration}</small>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>

                <Row className="justify-content-center align-item-center mt-3 h-100 w-100 mx-5">
                    <Col className="text-center">
                        <Card style={{ maxWidth: '700px' }}>
                            <Card.Header className='w-100 bg-transparent border border-bottom-0'>
                                {/* <div className="card-label">Suspendue</div> */}
                                <Row className="d-block align-items-center">
                                    <img src='https://media.gettyimages.com/id/625739874/fr/photo/exercice-de-poids-lourd.webp?s=612x612&w=gi&k=20&c=cJveTpgDDbleNo_DSAJ2zK41i2WRNa0SfBDJ5krjIt0=' alt={"Logo" + Compagnie.nom} className='w-25 h-25' />
                                    <Col className="align-items-center text-center">
                                        <i className='fw-bolder'>{Compagnie.nom}</i>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <hr className='fw-bolder' />
                            <strong className='d-flex justify-content-center text-primary text-uppercase'>Carte d'abonnement {abonnement.typeAbonnement}</strong>
                            <hr className='fw-bolder' />
                            <p className='mx-2 text-center'>{Compagnie.activite}</p>
                            <Row className="d-flex justify-content-center align-items-center">
                                <Col xs={4} md={6} className="text-center">
                                    <Card.Img variant="top" src='//upload.wikimedia.org/wikipedia/commons/thumb/7/78/Qrcode_wikipedia_fr_v2clean.png/600px-Qrcode_wikipedia_fr_v2clean.png' className="rounded-start w-75 m-1" alt={"QR CODE " + (abonnement.idAbonnement)} />
                                </Col>
                                <Col xs={12} md={6} className="text-center">
                                    <Card.Body className='h-100'>
                                        {/* <Card.Title>{member.nom} {member.prenom}</Card.Title> */}
                                        {/* <h6 className='text-center text-primary'>{abonnement.typeAbonnement}</h6> */}
                                        <ListGroup>
                                            <ListGroup.Item className="border border-0">
                                                {Compagnie.telephone}
                                            </ListGroup.Item>
                                            <ListGroup.Item className="border border-0">
                                                {Compagnie.email}
                                            </ListGroup.Item>
                                            <ListGroup.Item className="border border-0">
                                                {Compagnie.adresse}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default UserCard