import { Connectivite } from '../../services/Connectivité';
import { useState } from 'react';
import { AllTypeAbonnements, AllUsers } from "../../services/Data";
import { Form, Button, Col, InputGroup, FormControl, Card, Container } from 'react-bootstrap';
// import { LoginAdmin } from "../../services/Data";
import NavigationbarAdmin from './Navbar';
import './styles.css';

function AjoutAbonnement() {
    Connectivite();
    const types = AllTypeAbonnements();
    const users = AllUsers();

    const [typeId, setTypeId] = useState(1);
    const [userId, setUserId] = useState(1);
    const [duree, setDuree] = useState('');

    const selectedType = types.find((t) => t.id === typeId);
    const selectedUser = users.find((u) => u.id === userId);

    function calculateEndDate(duree) {
        const today = new Date();
        const endDate = new Date(today.getFullYear(), today.getMonth() + duree, today.getDate());
        return endDate.toLocaleDateString();
    }

    function calculatePrice() {
        return selectedType.prix * duree;
    }

    const handleTypeChange = (event) => {
        setTypeId(parseInt(event.target.value));
    };

    const handleUserChange = (event) => {
        setUserId(parseInt(event.target.value));
    };

    const handleDureeChange = (event) => {
        setDuree(parseInt(event.target.value));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Appeler une fonction pour traiter les données ici
        const data = {
            typeId,
            userId,
            duree,
            dateFinAbonnement: calculateEndDate(duree),
            prixAbonnement: calculatePrice()
        };
        console.log(data); // Afficher les données dans la console pour cet exemple
    };

    return (
        <div>
            <NavigationbarAdmin />
            <Container className="mb-3 d-flex justify-content-center align-items-center">
                <Card>
                    <Card.Body>
                        <h1 className="mb-4">Souscrire à un abonnement</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" as={Col}>
                                <Form.Label>Type d'abonnement :</Form.Label>
                                <Form.Control as="select" value={typeId} onChange={handleTypeChange} className>
                                    {types.map((t) => (
                                        <option key={t.id} value={t.id}>
                                            {t.nom}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-3' controlId="user">
                                <Form.Label>Utilisateur :</Form.Label>
                                <InputGroup>
                                    <FormControl as="select" value={userId} onChange={handleUserChange}>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.nom} {user.prenom}
                                            </option>
                                        ))}
                                    </FormControl>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className='mb-3' controlId="duree">
                                <Form.Label>Durée d'abonnement :</Form.Label>
                                <FormControl as="select" value={duree} onChange={handleDureeChange}>
                                    <option value="1">1 mois</option>
                                    <option value="3">3 mois</option>
                                    <option value="6">6 mois</option>
                                    <option value="12">1 an</option>
                                </FormControl>
                            </Form.Group>
                            <Form.Group className='mb-3' >
                                <Form.Label>Date de fin d'abonnement :</Form.Label>
                                <FormControl
                                    id="dateFinAbonnement"
                                    value={duree ? calculateEndDate(duree) : calculateEndDate(selectedType.durée)}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Prix :</Form.Label>
                                <FormControl
                                    id="prixAbonnement"
                                    value={calculatePrice() === 0 ? selectedType.prix : calculatePrice()}
                                    readOnly
                                />
                            </Form.Group>
                            <Button className="w-100" type="submit">S'abonner</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default AjoutAbonnement;
