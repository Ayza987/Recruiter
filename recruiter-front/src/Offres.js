/*
 *   Copyright (c) 2024 
 *   All rights reserved.
 */
/**
 * @file Offres.js
 * @description 
 * @author 
 * @copyright 
 */

import React from 'react';
import styles from './Offres.module.css';
import { FaUser, FaChartBar, FaTasks, FaDochub, FaCog, FaQuestionCircle, FaSignOutAlt, FaTimes, FaGoogleDrive, FaGoogle, FaFacebook, FaGitAlt, FaYoutube } from 'react-icons/fa';


const Offres = () => {
  return (
    <div className={styles.offreContainer}>
      <nav className={styles.offreNav}>
        <div className={styles.offreNavbar}>
          <div className={styles.offreLogo}>
            <h1>DASHBOARD</h1>
          </div>
          <ul>
            <li>
              <a href="#">
                <FaUser />
                <span className={styles.offreNavItem}>Accueil</span>
              </a>
            </li>
            <li>
              <a href="#">
                <FaChartBar />
                <span className={styles.offreNavItem}>Offres d'emploi</span>
              </a>
            </li>
            <li>
              <a href="#">
                <FaTasks />
                <span className={styles.offreNavItem}>Gestion des congés</span>
              </a>
            </li>
            <li>
              <a href="#">
                <FaQuestionCircle />
                <span className={styles.offreNavItem}>Contact</span>
              </a>
            </li>
            <li>
              <a href="#" className={styles.offreLogout}>
                <FaSignOutAlt />
                <span className={styles.offreNavItem}>Déconnexion</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <section className={styles.offreMain}>
        <div className={styles.offreMainTop}>
          <p>GSC Recruiter</p>
        </div>
        <div className={styles.offreMainBody}>
          <h1>Offres Récentes</h1>

          <div className={styles.offreSearchBar}>
            <input type="search" placeholder="Search job here..." />
            
            <select className={styles.offreFilter}>
              <option>Département Soft</option>
              <option>Département Bon Comptoir</option>
              <option>Département Marketing</option>
              <option>Département Technique</option>
            </select>
          </div>

          <div className={styles.offreTagsBar}>
            <div className={styles.offreTag}>
            <button className={styles.offreButton}>Publier une offre</button>
            </div>
          </div>

          <div className={styles.offreRow}>
            <p>There are more than <span>400</span> Jobs</p> <a href="#">See all</a>
            
          </div>

          <div className={styles.jobCard}>
            <div className={styles.jobDetails}>
              
              <div className={styles.text}>
                <h2>UX Designer</h2>
                <span>Google Drive - Junior Post</span>
              </div>
            </div>
            <div className={styles.jobSalary}>
            <button className={styles.consultButton}>Consulter</button>
            </div>
          </div>

          <div className={styles.jobCard}>
            <div className={styles.jobDetails}>
              
              <div className={styles.text}>
                <h2>JavaScript Developer</h2>
                <span>Google - Senior Post</span>
              </div>
            </div>
            <div className={styles.jobSalary}>
            <button className={styles.consultButton}>Consulter</button>
            </div>
          </div>

          <div className={styles.jobCard}>
            <div className={styles.jobDetails}>
              
              <div className={styles.text}>
                <h2>Product Developer</h2>
                <span>Facebook - Manager Post</span>
              </div>
            </div>
            <div className={styles.jobSalary}>
            <button className={styles.consultButton}>Consulter</button>
            </div>
          </div>

          <div className={styles.jobCard}>
            <div className={styles.jobDetails}>
             
              <div className={styles.text}>
                <h2>Programmer</h2>
                <span>Github - Junior Post</span>
              </div>
            </div>
            <div className={styles.jobSalary}>
            <button className={styles.consultButton}>Consulter</button>
            </div>
          </div>

          <div className={styles.jobCard}>
            <div className={styles.jobDetails}>
              
              <div className={styles.text}>
                <h2>React.js Expert</h2>
                <span>Youtube - VIP</span>
              </div>
            </div>
            <div className={styles.jobSalary}>
            <button className={styles.consultButton}>Consulter</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Offres;
