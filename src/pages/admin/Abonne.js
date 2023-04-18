import { Connectivite } from '../../services/Connectivité';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Form, FormControl, InputGroup, Container, Row, Col, Button } from 'react-bootstrap';
import NavigationbarAdmin from './Navbar';
import { prixAbonnementsActifTotal, prixAbonnementsDelivréMois, prixAbonnementsExpireMois, AllUsers, AdminById, CreateUser } from "../../services/Data";
import { FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BsPencilSquare, BsEyeFill } from 'react-icons/bs';

// Tableau des utilisateurs
const users = AllUsers();

const AbonneList = () => {
    const { userSelectId } = useParams();

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState({ field: '', order: '' });
    const [selectedUser, setSelectedUser] = useState(null);

    // Trie les utilisateurs par colonne
    const sortUsers = (field) => {
        const order = sort.field === field && sort.order === 'asc' ? 'desc' : 'asc';
        setSort({ field, order });
    };


    // Recherche les utilisateurs en fonction du terme de recherche
    const filteredUsers = users.filter((user) =>
        user.id.toString().includes(search.trim().toLowerCase()) ||
        user.nom.toLowerCase().includes(search.trim().toLowerCase()) ||
        user.prenom.toLowerCase().includes(search.trim().toLowerCase()) ||
        user.email.toLowerCase().includes(search.trim().toLowerCase()) ||
        user.telephone.toLowerCase().includes(search.trim().toLowerCase()) ||
        AdminById(user.inscripteur).nom.toLowerCase().includes(search.trim().toLowerCase()) ||
        AdminById(user.inscripteur).prenom.toLowerCase().includes(search.trim().toLowerCase())
    );

    // Trie les utilisateurs en fonction de l'ordre sélectionné
    const sortedUsers = filteredUsers.sort((a, b) => {
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
                <h1>Liste des abonnés</h1>
                <div className='border border-light mt-2'>
                    {/* Barre de recherche */}
                    <Row className="g-2 mb-2">
                        <Col md={6}>
                            <Form className="mb-3">
                                <InputGroup>
                                    <FormControl
                                        placeholder="Rechercher des abonnés..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </InputGroup>
                            </Form>
                        </Col>
                        <Col md={6} className="text-end">
                            <Button variant="primary">
                                <Link to="/Admin/abonne/Ajout" className="text-white text-decoration-none">
                                    <FaUserPlus className="me-2" />
                                    Ajouter abonné(e)
                                </Link>
                            </Button>
                        </Col>
                    </Row>

                    {/* Table des utilisateurs */}
                    <Table responsive>
                        <thead>
                            <tr>
                                <th onClick={() => sortUsers('nom')}>
                                    Nom et Prénom
                                </th>
                                <th onClick={() => sortUsers('email')}>
                                    Mail
                                </th>
                                <th onClick={() => sortUsers('telephone')}>
                                    Telephone
                                </th>
                                <th onClick={() => sortUsers('inscripteur')}>
                                    Inscripteur
                                </th>
                                <th>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedUsers.map((user) => (
                                <tr key={user.id} onClick={() => setSelectedUser(user)} className={userSelectId == user.id ? 'table-active' : ''}>
                                    <td><span className='me-2 text-uppercase'>{user.prenom}</span>{user.nom}</td>
                                    <td><a href={`mailto:${user.email}`} className='text-decoration-none text-dark'>{user.email}</a></td>
                                    <td><a href={`tel:${user.telephone}`} className='text-decoration-none text-dark'> {user.telephone}</a></td>
                                    <td>{AdminById(user.inscripteur).prenom}{' '}{AdminById(user.inscripteur).nom}</td>
                                    <>
                                        {
                                            user.inscripteur == Connectivite().userId ?
                                                <td>
                                                    <Button variant="outline-primary" className="mr-2" as={Link} to={`/Admin/abonne/Ajout/${user.id}`}>
                                                        <BsPencilSquare size={20} /> Modifier
                                                    </Button>
                                                    <Button variant="outline-success" as={Link} to={`/Admin/ProfilUsers/${user.id}`}>
                                                        <BsEyeFill size={20} /> Voir
                                                    </Button>
                                                </td>
                                                :
                                                <td>
                                                    <Button variant="outline-success" as={Link} to={`/Admin/ProfilUsers/${user.id}`}>
                                                        <BsEyeFill size={20} /> Voir
                                                    </Button>
                                                </td>
                                        }
                                    </>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </>
    );
};

export default AbonneList;
