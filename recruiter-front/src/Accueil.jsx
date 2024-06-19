/*
 *   Copyright (c) 2024 
 *   All rights reserved.
 */






import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Accueil.module.css';
import { FaBriefcase } from 'react-icons/fa';

const Accueil = () => {
  const isLoggedIn = localStorage.getItem('token');
  

  const handleClick = (event) => {
    if (!isLoggedIn) {
      event.preventDefault();
      alert('Vous devez être connecté pour accéder à cette page.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    window.location.href = '/';
  };

  return (
    <div className={styles.homepage}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>GSC Recruiter</div>
        <div className={styles.navLinks}>
          <Link to="/offres">Les Offres</Link>
          <Link to="/calendar" onClick={handleClick}>Mes Congés</Link>
          <Link to="/dashboard" onClick={handleClick}>Dashboard</Link>
          <Link to="https://www.gsc-technology.com/contact/">Contact</Link>
          {isLoggedIn ? (
            <button className={styles.loginButton} onClick={handleLogout}>
              Déconnexion
            </button>
          ) : (
            <Link to="/connexion">
              <button className={styles.loginButton}>Se connecter</button>
            </Link>
          )}
        </div>
      </nav>
      <div className={styles.heroContent}>
        <Link to="/offres">
          <button className={styles.applyButton}>
            Postuler <FaBriefcase className={styles.icon} />
          </button>
        </Link>
        <div className={styles.heroText}>
          <h1>Trouvez les meilleures</h1>
          <h1>offres d'emploi sur</h1>
          <h1>GSC Recruiter</h1>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
