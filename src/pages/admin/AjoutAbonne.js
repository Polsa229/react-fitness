import { Connectivite } from '../../services/Connectivité';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import NavigationbarAdmin from './Navbar';
import { CreateUser } from "../../services/Data";
import { prixAbonnementsActifTotal, prixAbonnementsDelivréMois, prixAbonnementsExpireMois, getNonExpiredAbonnements, UsersById, typeAbonnementsById, AllUsers } from "../../services/Data";

function AjoutAbonne() {
    Connectivite();
    
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [photo, setPhoto] = useState(null);

    const { id } = useParams();

    let result = {};
    
    const user = AllUsers();
    for (let i = 0; i < user.length; i++) {
        if (user[i].id == parseInt(id)) {
            result = user[i];
            break
        }
    }
    
    useEffect(() => {
        if (id) {
            if (result.nom) {
                setNom(result.nom)
            }
            if (result.prenom) {
                setPrenom(result.prenom)
            };
            if (result.email) {
                setEmail(result.email)
            };
            if (result.telephone) {
                setTelephone(result.telephone)
            };
        }
    }, []);

    // AJout
    const handleSubmit = (event) => {
        event.preventDefault();
        //Créer un objet FormData pour stocker les données du formulaire
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('prenom', prenom);
        formData.append('email', email);
        formData.append('telephone', telephone);
        formData.append('photo', photo);

        console.log(`Nom: ${nom}, Prénom: ${prenom}, Email: ${email}, Téléphone: ${telephone}, Photo: ${photo.name}`);
        // Envoyer les données au serveur ici
    };

    // Modification
    const handleSubmitUpdate = (event) => {
        event.preventDefault();
        //Créer un objet FormData pour stocker les données du formulaire
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('prenom', prenom);
        formData.append('email', email);
        formData.append('telephone', telephone);
        formData.append('photo', photo);
        formData.append('id', id);
        console.log(`Id: ${id},Nom: ${nom}, Prénom: ${prenom}, Email: ${email}, Téléphone: ${telephone}, Photo: ${photo.name}`);
        // Envoyer les données au serveur ici
    };
    const handlePhotoChange = (event) => {
        setPhoto(event.target.files[0]);
    };

    return (
        <div>
            <NavigationbarAdmin />
            <Container className="mb-3 d-flex justify-content-center align-items-center">
                <Card>
                    <Card.Body>
                        <h1 className="mb-4">Ajout d'abonné</h1>
                        <Form onSubmit={Object.keys(result).length == 0 ? handleSubmit : handleSubmitUpdate}>
                            <Form.Group className="mb-3" controlId="formBasicNom">
                                <Form.Label>Nom</Form.Label>
                                <Form.Control required type="text" placeholder="Entrez votre nom" value={nom} onChange={(event) => setNom(event.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPrenom">
                                <Form.Label>Prénom</Form.Label>
                                <Form.Control required type="text" placeholder="Entrez votre prénom" value={prenom} onChange={(event) => setPrenom(event.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control required type="email" placeholder="Entrez votre email" value={email} onChange={(event) => setEmail(event.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicTelephone">
                                <Form.Label>Téléphone</Form.Label>
                                <Form.Control required type="tel" placeholder="Entrez votre téléphone" value={telephone} onChange={(event) => setTelephone(event.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPhoto">
                                <Form.Label>Photo</Form.Label>
                                <Form.Control required type="file" accept="image/*" onChange={handlePhotoChange} />
                            </Form.Group>

                            <Button variant="primary" type="submit" className='w-100'>
                                {Object.keys(result).length == 0 ? 'Ajouter' : 'Modifier'}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default AjoutAbonne;
