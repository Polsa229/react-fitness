import { useState } from "react";
import { Card, Form, Button, Spinner, Alert } from "react-bootstrap";

function EmailForm({ setEmail }) {
    const [emailInput, setEmailInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulation d'une vérification de l'adresse mail
        setTimeout(() => {
            // Check email validation
            const regex = /\S+@\S+\.\S+/;
            if (!regex.test(emailInput)) {
                setErrorMsg("Entrer un email valide !");
                setIsLoading(false);
                return;
            } else {
                setEmail(emailInput);
                setIsValidEmail(true);
                setIsLoading(false);
            }
        }, 2000);

    };

    return (
        <Form onSubmit={handleEmailSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Adresse mail</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Entrer votre adresse mail"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                />
            </Form.Group>

            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

            <Button variant="primary" className="w-100" type="submit" disabled={isLoading}>
                {isLoading ? <Spinner animation="border" size="sm" /> : "Soumettre"}
            </Button>
        </Form>
    );
}

function PasswordResetForm({ email }) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{12,}$/;
        const isPasswordValid = regex.test(newPassword);

        console.log(isPasswordValid);

        // Simulation d'une vérification de la confirmation de mot de passe 
        setTimeout(() => {
            // Check password validation
            if (newPassword !== confirmPassword) {
                setSuccessMsg("");
                setErrorMsg("Confirmation érronée");
                setIsLoading(false);
                return;
            } else {
                if (!isPasswordValid) {
                    setSuccessMsg("");
                    setErrorMsg("Le mot de passe doit avoir au moins 8 caractères. Soit des chiffres, des lettres en majuscules et en minuscules et des caractères spéciaux tels que !, @, #, $, %, &, *, etc");
                    setIsLoading(false);
                    return;
                } else {
                    setIsLoading(false);
                    setErrorMsg("");
                    setSuccessMsg("Mot de passe changé avec succès !");
                    setTimeout(() => {
                        window.location.href = "/Admin/Connexion";
                    }, 100);
                }
            }
        }, 2000);

    };

    return (
        <Form onSubmit={handlePasswordSubmit}>
            <Form.Group className="mb-3" controlId="formNewPassword">
                <Form.Label>Nouveau mot de passe</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter le nouveau mot de passe"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Confirmer le mot de passe</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Confirmation du mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </Form.Group>

            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
            {successMsg && <Alert variant="success">{successMsg}</Alert>}

            <Button variant="primary" className="w-100" type="submit" disabled={isLoading}>
                {isLoading ? <Spinner animation="border" size="sm" /> : "Soumettre"}
            </Button>
        </Form>
    );
}

function ResetPassword() {
    const [email, setEmail] = useState("");

    return (
        <Card className="mx-auto my-5 p-3" style={{ maxWidth: "600px" }}>
            {!email && <EmailForm setEmail={setEmail} />}
            {email && <PasswordResetForm email={email} />}
        </Card>
    );
}

export default ResetPassword;
