/*
 *   Copyright (c) 2024 
 *   All rights reserved.
 */
/**
 * @file dashboards.js
 * @description Dashboard
 * @author 
 * @copyright 
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaTasks, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [jobs, setJobs] = useState([]);
  
  
  
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/offre')
      .then(response => {
        console.log(response)
        setJobs(response.data.offres);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  

  const handleDepartmentChange = (e) => { 
    setDepartment(e.target.value);
    if (e.target.value === '') {
      axios.get('http://127.0.0.1:8000/offre')
        .then(response => {
          setJobs(response.data.offres);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      axios.get(`http://127.0.0.1:8000/offre/department/${e.target.value}`)
        .then(response => {
          console.log(response)
          setJobs(response.data.offres);
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            setJobs([]);
          console.error(error);
    }});
    }
  };
  

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  
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

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/offre/${id}/delete`)
      .then(response => {
        console.log(response.data);
        setJobs(jobs.filter(job => job.id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };

    

  return (
    <div className={styles.dashboardContainer}>
      <nav className={styles.dashboardNav}>
        <div className={styles.dashboardNavbar}>
          <div className={styles.dashboardLogo}>
            <h1>DASHBOARD</h1>
          </div>
          <ul>
            <li>
              <Link to="/">
                <FaUser />
                <span className={styles.dashboardNavItem}>Accueil</span>
              </Link>
            </li>
            <li>
              <Link to="/Congés">
                <FaTasks />
                <span className={styles.dashboardNavItem}>Gestion des congés</span>
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

      <section className={styles.dashboardMain}>
        <div className={styles.dashboardMainTop}>
          <p>GSC Recruiter</p>
        </div>
        <div className={styles.dashboardMainBody}>
          <h1>Offres Récentes</h1>

          <div className={styles.dashboardSearchBar} onChange={handleSearchChange}>
            <input type="search" placeholder="Search job here..." />
            
            <select className={styles.dashboardFilter} onChange={handleDepartmentChange}>
            <option value="" defaultValue>Tous les départements</option>
              <option value="Soft">Soft</option>
              <option value="Bon Comptoir">Bon Comptoir</option>
              <option value="Marketing">Marketing</option>
              <option value="Technique">Technique</option>
            </select>
          </div>

          <div className={styles.dashboardTagsBar}>
            <div className={styles.dashboardTag}>
              <button className={styles.dashboardButton}>Publier une offre</button>
            </div>
          </div>

          <div className={styles.dashboardRow}>
            <p>Il y'a <span>{jobs.length}</span> offre(s) d'emploi disponible(s)</p>
            <a href="#">See all</a>
          </div>

          {jobs.filter(job => job.intitulé.toLowerCase().includes(search.toLowerCase())).map(job => (
            <div className={styles.jobCard} key={job.id}>
              <div className={styles.jobDetails}>
                <div className={styles.text}>
                  <h2>{job.intitulé}</h2>
                  <span>Offre valide jusqu'à la date : <strong>{job.date_butoir}</strong></span> <br />
                  <span>Publiée par le département : <strong>{job.departement}</strong></span>
                  
                </div>
              </div>
              <div className={styles.jobSalary}>
                <button className={styles.consultButton}>Consulter</button>
                <button className={styles.deleteButton} onClick={() => handleDelete(job.id)}>Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;