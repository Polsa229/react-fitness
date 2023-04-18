import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserCard from './pages/users/UsersCard';
import Test from './pages/admin/Test';
import Accueil from './pages/users/Accueil';
import ConnexionAdmin from './pages/admin/Connexion';
import InscriptionAdmin from './pages/admin/Inscription';
import ResetPassword from './pages/admin/ResetPassword';
import NotFoundPage from './NotFoundPage';
import Dashboard from './pages/admin/Dashboard';
import NavigationBar from './pages/admin/Navbar';
import AbonnementsList from './pages/admin/Abonnements';
import AjoutAbonnement from './pages/admin/AjoutAbonnement';
import AjoutAbonne from './pages/admin/AjoutAbonne';
import AbonneList from './pages/admin/Abonne';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Accueil />} />
        <Route path='/:id' element={<UserCard />} />
        <Route path='/Admin/Connexion' element={<ConnexionAdmin />} />
        <Route path='/Admin/Inscription' element={<InscriptionAdmin />} />
        <Route path='/Admin/ResetPassword' element={<ResetPassword />} />
        <Route path='/Admin/NavBar' element={<NavigationBar />} />
        <Route path='/Admin/abonnements' element={<AbonnementsList />} />
        <Route path='/Admin/abonnements/:abonnementSelectId' element={<AbonnementsList />} />
        <Route path='/Admin/abonnements/Ajout' element={<AjoutAbonnement />} />
        <Route path='/Admin/abonnements/Ajout/:id' element={<AjoutAbonnement />} />
        {/* <Route path='/Admin/ProfilAdmin/:id' element={<Test />} /> */}
        <Route path='/Admin/ProfilUsers/:id' element={<Test />} />
        <Route path='/Admin/abonne/Ajout' element={<AjoutAbonne />} />
        <Route path='/Admin/abonne/Ajout/:id' element={<AjoutAbonne />} />
        <Route path='/Admin/abonne' element={<AbonneList />} />
        <Route path='/Admin/abonne/:userSelectId' element={<AbonneList />} />
        <Route path='/Admin' element={<Dashboard />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
