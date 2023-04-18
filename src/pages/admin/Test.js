import { Connectivite } from '../../services/Connectivité';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AllTypeAbonnements, AllUsers, AdminById } from "../../services/Data";
import { Form, Button, Col, InputGroup, FormControl, Card, Container } from 'react-bootstrap';
import { LoginAdmin } from "../../services/Data";
import NavigationbarAdmin from './Navbar';
import './styles.css';
// import { prixAbonnementsActifTotal, prixAbonnementsDelivréMois, prixAbonnementsExpireMois, AllUsers, AdminById, CreateUser } from "../../services/Data";

function Test() {
    Connectivite();
    const { id } = useParams();
    let user = {};
    const users = AllUsers();
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == parseInt(id)) {
            user = users[i];
            break
        }
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={user.image} alt={user.nom+' '+user.prenom}/>
            <Card.Body>
                <Card.Title>{user.nom} {user.prenom}</Card.Title>
                <Card.Text>
                    Email: {user.email}
                    <br />
                    Téléphone: {user.telephone}
                    <br />
                    Date d'inscription: {user.date}
                    <br />
                    Inscripteur: {AdminById(user.inscripteur).prenom}{' '}{AdminById(user.inscripteur).nom}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Test;
