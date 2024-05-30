/*
 *   Copyright (c) 2024 
 *   All rights reserved.
 */
/**
 * @file Dashboard.js
 * @description 
 * @author 
 * @copyright 
 */

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';
import { FaSearch, FaDownload } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>DASHBOARD</h2>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink}>Accueil</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/conges" className={styles.navLink}>Gérer les congés</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/offres" className={`${styles.navLink} ${styles.navItemActive}`}>Offres d'emploi</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/contact" className={styles.navLink}>Contact</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/deconnexion" className={styles.navLink}>Déconnexion</Link>
          </li>
        </ul>
      </aside>
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <img src="path_to_logo" alt="GSC Recruiter" className={styles.headerLogo} />
          <div className={styles.buttonContainer}>
            <button className={styles.postButton}>Publier une offre</button>
            <div className={styles.searchContainer}>
              <input type="text" placeholder="Rechercher..." className={styles.searchInput} />
              <FaSearch className={styles.searchIcon} />
            </div>
            <button className={styles.sortButton}>Trier par</button>
          </div>
        </header>
        <section className={styles.tableSection}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Département</th>
                <th>Poste</th>
                <th>Documents</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ABDOURAHMAN</td>
                <td>ALIOU</td>
                <td>SOFT</td>
                <td>Développeur Fullstack</td>
                <td>
                  <button className={styles.documentButton}>
                    <FaDownload /> CV
                  </button>
                  <button className={styles.documentButton}>
                    <FaDownload /> Diplômes
                  </button>
                  <button className={styles.documentButton}>
                    <FaDownload /> Lettre
                  </button>
                </td>
                <td>
                  <button className={styles.approveButton}>Approuver</button>
                  <button className={styles.rejectButton}>Rejeter</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
