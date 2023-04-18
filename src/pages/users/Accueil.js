import { useState } from 'react';
import { Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { AllAbonnements } from "../../services/Data";

function Accueil() {
    const [id, setId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    // const [idExist, setIdExist] = useState(false);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        setShowAlert(false);
        let IdExist = false;
        setTimeout(() => {
            setIsLoading(false);

            // Vérifier si l'identifiant existe
            let result = 0;
            const abonnements = AllAbonnements();
            for (let i = 0; i < abonnements.length; i++) {
                if (abonnements[i].id == parseInt(id)) {
                    result++;
                    break
                }
            }

            // Vérifier l'existence de l'id dan sla base de données
            if (result !== 0) {
                IdExist = true;
            } else {
                IdExist = false;
            }

            if (IdExist) {
                setShowAlert(false);
                window.location.href = "/" + id;
            } else {
                setShowAlert(true);
            }
        }, 2000);
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card>
                <Card.Header className='text-center'>Mon formulaire</Card.Header>
                <Card.Body className='px-5'>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="formId" className='mb-3'>
                            <Form.Label>Identifiant</Form.Label>
                            <Form.Control type="text" placeholder="Entrez l'identifiant" value={id} onChange={(event) => setId(event.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className='w-100'>
                            {isLoading ? <Spinner animation="border" size="sm" /> : 'Envoyer'}
                        </Button>
                    </Form>
                    {showAlert && <Alert variant="danger" className="mt-3">Identifiant incorrect !</Alert>}
                </Card.Body>
            </Card>
        </div>
    );
}
export default Accueil