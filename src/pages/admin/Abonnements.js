import { Connectivite } from '../../services/Connectivité';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Form, FormControl, InputGroup, Container, Row, Col, Button } from 'react-bootstrap';
import NavigationbarAdmin from './Navbar';
import { prixAbonnementsActifTotal, prixAbonnementsDelivréMois, prixAbonnementsExpireMois, AllAbonnements, AdminById, UsersById, typeAbonnementsById } from "../../services/Data";
import { FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Tableau des utilisateurs
const abonnements = AllAbonnements();

const AbonnementsList = () => {
    const { abonnementSelectId } = useParams();

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState({ field: '', order: '' });
    const [selectedUser, setSelectedUser] = useState(null);

    // Trie les utilisateurs par colonne
    const sortUsers = (field) => {
        const order = sort.field === field && sort.order === 'asc' ? 'desc' : 'asc';
        setSort({ field, order });
    };


    // Recherche les utilisateurs en fonction du terme de recherche
    const filteredAbonnements = abonnements.filter((abonnement) =>
        (abonnement.id.toString()).includes((search.toString().trim()).toLowerCase()) ||
        (UsersById(abonnement.id).nom.toLowerCase()).includes((search.toString().trim()).toLowerCase()) ||
        (UsersById(abonnement.id).prenom.toLowerCase()).includes((search.toString().trim()).toLowerCase()) ||
        (typeAbonnementsById(abonnement.type).nom.toLowerCase()).includes((search.toString().trim()).toLowerCase()) ||
        (abonnement.dateExpire.toString()).includes((search.toString().trim()).toLowerCase()) ||
        (abonnement.date.toString()).includes((search.toString().trim()).toLowerCase())
    );
    console.log(abonnements)
    // Trie les utilisateurs en fonction de l'ordre sélectionné
    const sortedAbonnements = filteredAbonnements.sort((a, b) => {
        if (a[sort.field] && b[sort.field]) {
            if (sort.order === 'asc') {
                return a[sort.field].localeCompare(b[sort.field]);
            } else {
                return b[sort.field].localeCompare(a[sort.field]);
            }
        } else {
            return 0;
        }
    });

    return (
        <>
            <NavigationbarAdmin />
            <Container className="mb-3">
                <h1>Liste des abonnements</h1>
                <div className='border border-light mt-2'>
                    {/* Barre de recherche */}
                    <Row className="g-2 mb-2">
                        <Col md={6}>
                            <Form className="mb-3">
                                <InputGroup>
                                    <FormControl
                                        placeholder="Rechercher des abonnements..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </InputGroup>
                            </Form>
                        </Col>
                        <Col md={6} className="text-end">
                            <Button variant="primary">
                                <Link to="/Admin/abonnements/Ajout" className="text-white text-decoration-none">
                                    <FaUserPlus className="me-2" />
                                    Ajouter abonnement
                                </Link>
                            </Button>
                        </Col>
                    </Row>

                    {/* Table des utilisateurs */}
                    <Table responsive>
                        <thead>
                            <tr>
                                <th onClick={() => sortUsers('nom')}>
                                    Abonné
                                </th>
                                <th onClick={() => sortUsers('type')}>
                                    Type d'abonnement
                                </th>
                                <th onClick={() => sortUsers('dateExpire')}>
                                    Date d'enregistrement
                                </th>
                                <th onClick={() => sortUsers('dateExpire')}>
                                    Date d'expiration
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedAbonnements.map((abonnement) => (
                                <tr key={abonnement.id} onClick={() => setSelectedUser(abonnement)} className={abonnementSelectId == abonnement.id ? 'table-active' : ''}>
                                    <td><span className='me-2 text-uppercase'>{UsersById(abonnement.users).prenom}</span>{UsersById(abonnement.users).nom}</td>
                                    <td className='text-primary'>{typeAbonnementsById(abonnement.type).nom}</td>
                                    <td className='text-muted'>{abonnement.date}</td>
                                    <td className='text-muted'>{abonnement.dateExpire}</td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </div>
            </Container >
        </>
    );
};

export default AbonnementsList;
