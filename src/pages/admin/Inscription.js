import { useState } from 'react';
import { Container, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { useForm } from "react-hook-form";

function InscriptionAdmin() {
    const { register, trigger, reset, watch, formState: { errors, isSubmitting, isSubmitSuccessful, isValid }, } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptedTerms: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setLoading(true);
        const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        switch (name) {
            case 'lastName':
                formData.lastName =
                    value.length < 2 ? 'Le prénom doit comporter au moins 2 caractères' : '';
                console.log(formData.lastName)
                break;
            case 'firstName':
                errors.firstName =
                    value.length < 2 ? 'Le prénom doit comporter au moins 2 caractères' : '';
                break;
            case 'email':
                errors.email =
                    validEmailRegex.test(value) ? '' : 'L\'adresse e-mail n\'est pas valide';
                break;
            case 'password':
                errors.password =
                    value.length < 8 ? 'Le mot de passe doit comporter au moins 8 caractères' : '';
                break;
            case 'confirmPassword':
                errors.confirmPassword =
                    value !== formData.password ? 'Les mots de passe ne correspondent pas' : '';
                break;
            default:
                break;
        }
        // Simulation d'un appel à l'API pour vérifier les informations du formulaire
        setTimeout(() => {
            setLoading(false);
            setError('Une erreur s\'est produite lors de l\'inscription');
        }, 2000);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        let errors = formData.errors;

        setFormData({
            ...formData,
            [name]: value,
            errors: errors,
        });
    };


    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Card>
                <Card.Body>
                    <h1 className="mb-4">Inscription</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>Nom <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="lastName"
                                minLength={2}
                                maxLength={30}
                                placeholder="Entrer Votre nom"
                                onChange={handleChange}
                            />
                            <span className='text-danger'>
                                {formData.lastName.length < 2 ? 'Le nom doit comporter au moins 2 caractères' : ''}
                            </span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="firstName">
                            <Form.Label>Prénom <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                minLength={2}
                                maxLength={30}
                                required
                                onChange={handleChange}
                            />
                            <span className='text-danger'>
                                {formData.firstName.length < 2 ? 'Le prénom doit comporter au moins 2 caractères' : ''}
                            </span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                required
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Mot de passe <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                required
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="confirmPassword">
                            <Form.Label>Confirmation du mot de passe <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                required
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="acceptedTerms">
                            <Form.Check
                                required
                                type="checkbox"
                                label="J'accepte les termes et conditions de politique"
                                name="acceptedTerms"
                                checked={formData.acceptedTerms}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={loading} className='w-100'>
                            {loading ? (
                                <>
                                    <Spinner animation="border" size="sm" className="me-2" />
                                    Chargement...
                                </>
                            ) : (
                                'Inscription'
                            )}
                        </Button>
                    </Form>
                    <div className="mt-3 text-center">
                        Vous avez déjà un compte ? <a href="/Admin/Connexion" className='text-decoration-none'>Connectez-vous</a>.
                    </div>
                </Card.Body>
            </Card>
        </Container >
    );
}
export default InscriptionAdmin