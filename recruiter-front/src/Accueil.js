/*
 *   Copyright (c) 2024 
 *   All rights reserved.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import './Accueil.css';
import { FaBriefcase } from 'react-icons/fa';
import recruit from './recruit.jpg';

const Accueil = () => {
  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="logo">GSC Recruiter</div>
        <div className="nav-links">
          <Link to="/offres">Les Offres</Link>
          <Link to="/conges">Mes Congés</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/connexion">
            <button className="login-button">Se connecter</button>
          </Link>
        </div>
      </nav>
      <div className="hero-content">
      <button className="apply-button">
  Postuler <FaBriefcase />
</button>

        <div className="hero-text">
          <h1>Trouvez les meilleures</h1>
          <h1>offres d'emploi sur</h1>
          <h1>GSC Recruiter</h1>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
