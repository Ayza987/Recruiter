/*
 *   Copyright (c) 2024 
 *   All rights reserved.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Accueil.module.css';
import { FaBriefcase } from 'react-icons/fa';
import recruit from './recruit.jpg';

const Accueil = () => {
  return (
    <div className={styles.homepage}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>GSC Recruiter</div>
        <div className={styles.navLinks}>
          <Link to="/offres">Les Offres</Link>
          <Link to="/conges">Mes Congés</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/connexion">
            <button className={styles.loginButton}>Se connecter</button>
          </Link>
        </div>
      </nav>
      <div className={styles.heroContent}>
      <button className={styles.applyButton}>
  Postuler <FaBriefcase className={styles.icon} />
</button>


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
