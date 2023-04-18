import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { FaRegMeh } from 'react-icons/fa';

const NotFoundPage = () => {
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <Container className="h-100">
            <Row>
                <Col xs={{ span: 12 }} md={{ span: 6, offset: 3 }} className="text-center">
                    <FaRegMeh size={100} className="my-4" />
                    <h2 className="mb-2">404 - Chemin introuvable</h2>
                    <p className="mb-4">La page que vous recherchez n'existe pas.</p>
                    <Button onClick={handleGoBack} variant="primary">Retour à la page précédente</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFoundPage;
