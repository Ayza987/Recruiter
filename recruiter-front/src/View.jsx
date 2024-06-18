/*
 *   Copyright (c) 2024 
 *   All rights reserved.
 */
/**
 * @file View.js
 * @description 
 * @author 
 * @copyright 
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './View.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaTasks, FaChartBar, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';

const View = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/candidat')
      .then(response => {
        setJobs(response.data.candidats);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredJobs = jobs.filter(job => 
    job.nom.toLowerCase().includes(search.toLowerCase()) || 
    job.prenom.toLowerCase().includes(search.toLowerCase()) ||
    job.email.toLowerCase().includes(search.toLowerCase()) ||
    job.telephone.toLowerCase().includes(search.toLowerCase()) ||
    job.Adresse.toLowerCase().includes(search.toLowerCase()) ||
    job.intitule.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    const token = localStorage.getItem('token'); 

    axios.post('http://127.0.0.1:8000/api/auth/logout', {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data);
        localStorage.removeItem('token'); 
        navigate('/'); 
      })
      .catch(error => {
        console.error(error);
        window.alert('Erreur lors de la déconnexion. Veuillez réessayer.');
      });
  };

  return (
    <div className={styles.viewContainer}>
      <nav className={styles.viewNav}>
        <div className={styles.viewNavbar}>
          <div className={styles.viewLogo}>
            <h1>dashboard</h1>
          </div>
          <ul>
          <span className={styles.viewNavItem}>
            <li>
              <Link to="/">
                <FaUser />
                Accueil
              </Link>
            </li> </span>
            <li>
              <Link to="/Congés">
                <FaTasks />
                <span className={styles.viewNavItem}>Gestion des congés</span>
              </Link>
            </li>
            <li>
              <a href="/Dashboard">
                <FaChartBar />
                <span className={styles.viewNavItem}>Offres d'emploi</span>
              </a>
            </li>
            <li>
              <Link to="/View">
                <FaTasks />
                <span className={styles.viewNavItem}>Gestion des candidats</span>
              </Link>
            </li>
            <li>
              <a href="https://www.gsc-technology.com/contact/">
                <FaQuestionCircle />
                <span className={styles.dashboardNavItem}>Contact</span>
              </a>
            </li>
            <li className={styles.logout} onClick={handleLogout}>
              <FaSignOutAlt />
              <button className={styles.dashboardNavItem}>Déconnexion</button>
            </li>
          </ul>
        </div>
      </nav>

      <section className={styles.viewMain}>
        <div className={styles.viewMainTop}>
          <p>GSC Recruiter</p>
        </div>
        <div className={styles.viewMainBody}>
          <h1>Candidatures récentes</h1>

          <div className={styles.viewSearchBar}>
            <input 
              type="search" 
              placeholder="Search job here..." 
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <div className={styles.viewRow}>
            <p>Il y a <span>{filteredJobs.length}</span> candidature(s).</p>
          </div>

          <div className={styles.viewTagsBar}>
            <div className={styles.viewTag}>
              <span className={styles.viewBar}>
                <span className={styles.viewBarItems}>ID</span>
                <span className={styles.viewBarItems}>Nom</span>
                <span className={styles.viewBarItems}>Prénom</span>
                <span className={styles.viewBarItems}>Email</span>
                <span className={styles.viewBarItems}>Téléphone</span>
                <span className={styles.viewBarItems}>Adresse</span>
                <span className={styles.viewBarItems}>Offre</span>
              </span>
            </div>
          </div>

          {filteredJobs.map(job => (
            <div key={job.id} className={styles.jobCard}>
              <div className={styles.jobDetails}>
                <div className={styles.text}>
                  <span className={styles.textItems}>{job.id}</span>
                  <span className={styles.textItems}>{job.nom}</span>
                  <span className={styles.textItems}>{job.prenom}</span>
                  <span className={styles.textItems}>{job.email}</span>
                  <span className={styles.textItems}>{job.telephone}</span>
                  <span className={styles.textItems}>{job.Adresse}</span>
                  <span className={styles.textItems}>{job.intitule}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default View;
