import { useState } from "react";
import { Card, Form, Button, Spinner, Alert, Container } from "react-bootstrap";
import { LoginAdmin } from "../../services/Data";

import './styles.css';

function ConnexionAdmin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        setError("");
        event.preventDefault();
        setLoading(true);
        setTimeout(() => {
            // Mettre ici le code pour vérifier le mail et le mot de passe
            const autorisation = LoginAdmin(email, password);
            alert('autorisation')
            // Si l'authentification échoue, on affiche un message d'erreur
            if (autorisation) {
                setLoading(true);
                setError("");
            } else {
                setError("Adresse email ou mot de passe incorrecte");
                setLoading(false);
            }

        }, 1000);
        setLoading(false);


        // ou effectuer d'autres actions nécessaires
    };

    return (
        <div className="d-flex align-items-center justify-content-center w-100 div-centree">
            <Card>
                <Card.Body>
                    <h2 className="text-center">Bon retour</h2>
                    <Container>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="email" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Entrez votre email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Entrez votre mot de passe"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                            </Form.Group>
                            <div className="mb-3 text-end">
                                <a href="/Admin/ResetPassword" className="text-decoration-none">Mot de passe oublié ?</a>
                            </div>
                            <div className="text-center">
                                <Button type="submit" disabled={loading} className="w-100">
                                    {loading && <Spinner animation="border" size="sm" />}
                                    {loading ? "Vérification en cours" : "Se connecter"}
                                </Button>
                            </div>
                        </Form>
                        <div className="mt-3 text-center">
                            N'avez-vous pas encore un compte ? <a href="/Admin/Inscription" className="text-decoration-none">Inscrivez-vous</a>
                        </div>
                    </Container>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ConnexionAdmin;
