import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { FaRegMeh } from 'react-icons/fa';

const NotFoundPage = () => {
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <Container className="my-5">
            <Row>
                <Col xs={{ span: 12 }} md={{ span: 6, offset: 3 }} className="text-center">
                    <FaRegMeh size={100} className="mb-4" />
                    <h1 className="mb-4">404 - Chemin introuvable</h1>
                    <p className="mb-4">La page que vous recherchez n'existe pas.</p>
                    <Button onClick={handleGoBack} variant="warning">Retour à la page précédente</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFoundPage;
