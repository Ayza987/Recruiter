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
      <nav>
        <div className={styles.offreNavbar}>
          <div className={styles.logo}>
            <h1>DASHBOARD</h1>
          </div>
          <ul>
            <li>
              <a href="#">
                <FaUser />
                <span className={styles.navItem}>Accueil</span>
              </a>
            </li>
            <li>
              <a href="#">
                <FaChartBar />
                <span className={styles.navItem}>Offres d'emploi</span>
              </a>
            </li>
            <li>
              <a href="#">
                <FaTasks />
                <span className={styles.navItem}>Gestion des congés</span>
              </a>
            </li>
            <li>
              <a href="#">
                <FaQuestionCircle />
                <span className={styles.navItem}>Contact</span>
              </a>
            </li>
            <li>
              <a href="#" className={styles.logout}>
                <FaSignOutAlt />
                <span className={styles.navItem}>Déconnexion</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <section className={styles.main}>
        <div className={styles.mainTop}>
          <p>GSC Recruiter</p>
        </div>
        <div className={styles.mainBody}>
          <h1>Offres Récentes</h1>

          <div className={styles.searchBar}>
            <input type="search" placeholder="Search job here..." />
            
            <select className={styles.filter}>
              <option>Département Soft</option>
              <option>Département Bon Comptoir</option>
              <option>Département Marketing</option>
              <option>Département Technique</option>
            </select>
          </div>

          <div className={styles.tagsBar}>
            <div className={styles.tag}>
              
              
              <span>Publier une offre</span>
            </div>
            
          </div>

          <div className={styles.row}>
            <p>There are more than <span>400</span> Jobs</p>
            <a href="#">See all</a>
          </div>

          <div className={styles.jobCard}>
            <div className={styles.jobDetails}>
              <div className={styles.img}>
                <FaGoogleDrive />
              </div>
              <div className={styles.text}>
                <h2>UX Designer</h2>
                <span>Google Drive - Junior Post</span>
              </div>
            </div>
            <div className={styles.jobSalary}>
              <h4>$6.7 - $12.5k /yr</h4>
              <span>1 days ago</span>
            </div>
          </div>

          <div className={styles.jobCard}>
            <div className={styles.jobDetails}>
              <div className={styles.img}>
                <FaGoogle />
              </div>
              <div className={styles.text}>
                <h2>JavaScript Developer</h2>
                <span>Google - Senior Post</span>
              </div>
            </div>
            <div className={styles.jobSalary}>
              <h4>$8.7 - $13.2k /yr</h4>
              <span>2 days ago</span>
            </div>
          </div>

          <div className={styles.jobCard}>
            <div className={styles.jobDetails}>
              <div className={styles.img}>
                <FaFacebook />
              </div>
              <div className={styles.text}>
                <h2>Product Developer</h2>
                <span>Facebook - Manager Post</span>
              </div>
            </div>
            <div className={styles.jobSalary}>
              <h4>$11 - $18.5k /yr</h4>
              <span>2 days ago</span>
            </div>
          </div>

          <div className={styles.jobCard}>
            <div className={styles.jobDetails}>
              <div className={styles.img}>
                <FaGitAlt />
              </div>
              <div className={styles.text}>
                <h2>Programmer</h2>
                <span>Github - Junior Post</span>
              </div>
            </div>
            <div className={styles.jobSalary}>
              <h4>$6 - $11.5k /yr</h4>
              <span>3 days ago</span>
            </div>
          </div>

          <div className={styles.jobCard}>
            <div className={styles.jobDetails}>
              <div className={styles.img}>
                <FaYoutube />
              </div>
              <div className={styles.text}>
                <h2>React.js Expert</h2>
                <span>Youtube - VIP</span>
              </div>
            </div>
            <div className={styles.jobSalary}>
              <h4>$12.5 - $25.5k /yr</h4>
              <span>4 days ago</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Offres;
