/*
 *   Copyright (c) 2024 
 *   All rights reserved.
 */
/**
 * @file dashboards.js
 * @description 
 * @author 
 * @copyright 
 */

import React from 'react';
import styles from './Dashboard.module.css';
import { FaUser, FaChartBar, FaTasks, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';

const dashboards = () => {
  return (
    <div className={styles.dashboardContainer}>
      <nav className={styles.dashboardNav}>
        <div className={styles.dashboardNavbar}>
          <div className={styles.dashboardLogo}>
            <h1>DASHBOARD</h1>
          </div>
          <ul>
            <li>
              <a href="/Accueil">
                <FaUser />
                <span className={styles.dashboardNavItem}>Accueil</span>
              </a>
            </li>
            <li>
              <a href="/Dashboard">
                <FaChartBar />
                <span className={styles.dashboardNavItem}>Offres d'emploi</span>
              </a>
            </li>
            <li>
              <a href="#">
                <FaQuestionCircle />
                <span className={styles.dashboardNavItem}>Contact</span>
              </a>
            </li>
            <li className={styles.logout}>
              <a href="#">
                <FaSignOutAlt />
                <span className={styles.dashboardNavItem}>Déconnexion</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <section className={styles.dashboardMain}>
        <div className={styles.dashboardMainTop}>
          <p>GSC Recruiter</p>
        </div>
        <div className={styles.dashboardMainBody}>
          <h1>Offres Récentes</h1>

          <div className={styles.dashboardSearchBar}>
            <input type="search" placeholder="Search job here..." />
            
            <select className={styles.dashboardFilter}>
              <option>Département Soft</option>
              <option>Département Bon Comptoir</option>
              <option>Département Marketing</option>
              <option>Département Technique</option>
            </select>
          </div>

          <div className={styles.dashboardTagsBar}>
            <div className={styles.dashboardTag}>
            <button className={styles.dashboardButton}>Publier une offre</button>
            </div>
          </div>

          <div className={styles.dashboardRow}>
            <p>There are more than <span>400</span> Jobs</p>
            <a href="#">See all</a>
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

export default dashboards;
