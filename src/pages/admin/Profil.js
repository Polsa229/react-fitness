import { Connectivite } from '../../services/Connectivité';
import React from 'react';
import { Card } from 'react-bootstrap';

const Profil = ({ user }) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={user.image} />
            <Card.Body>
                <Card.Title>{user.nom} {user.prenom}</Card.Title>
                <Card.Text>
                    Email: {user.email}
                    <br />
                    Téléphone: {user.telephone}
                    <br />
                    Date d'inscription: {user.date}
                    <br />
                    Inscripteur: {user.inscripteur}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Profil;
