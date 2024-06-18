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
import Modal from 'react-modal';
import { FaUser, FaTasks, FaChartBar, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [jobs, setJobs] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    intitulé: '',
    description: '',
    departement: '',
    statut_offre: '',
    date_butoir: '',
    type_offre:''
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/offre')
      .then(response => {
        console.log(response);
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
          console.log(response);
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

  const handleToggleStatus = (id) => {
    axios.put(`http://127.0.0.1:8000/offre/${id}/toggle-status`)
      .then(response => {
        setJobs(jobs.map(job => job.id === id ? response.data.offre : job));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/offre', newJob)
      .then(response => {
        console.log(response.data);
        setJobs([...jobs, response.data.offre]);
        setNewJob({
          intitulé: '',
          description: '',
          departement: '',
          statut_offre: '',
          date_butoir: '',
          type_offre: ''
        });
        closeModal();
        window.location.reload();
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
              <a href="/Dashboard">
                <FaChartBar />
                <span className={styles.dashboardNavItem}>Offres d'emploi</span>
              </a>
            </li>
            <li>
              <Link to="/View">
                <FaTasks />
                <span className={styles.dashboardNavItem}>Gestion des candidats</span>
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

          <div className={styles.dashboardSearchBar}>
            <input type="search" placeholder="Search job here..." onChange={handleSearchChange} />
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
              <button className={styles.dashboardButton} onClick={openModal}>Publier une offre</button>
            </div>
          </div>

          <div className={styles.dashboardRow}>
            <p>Il y'a <span>{jobs.length}</span> offre(s) d'emploi disponible(s)</p>
           
          </div>

          {jobs
          
          .filter(job => job.intitulé.toLowerCase().includes(search.toLowerCase()))
          .map(job => (
            <div className={styles.jobCard} key={job.id}>
              <div className={styles.jobDetails}>
                <div className={styles.text}>
                  <h2>{job.intitulé}</h2> <span className={styles.jobStatus}>{job.statut_offre}</span>
                  <br />
                 
                  <span>Offre valide jusqu'à la date : <strong>{job.date_butoir}</strong></span> <br />
                  <span>Publiée par le département : <strong>{job.departement}</strong></span> <br />
                  <span className={styles.offerSpan}>Type d'offre : <strong>{job.type_offre}</strong></span>
                </div>
              </div>
              <div className={styles.jobSalary}>
                {/* <button className={styles.consultButton}>Consulter</button> */}
                <button
                  className={styles.publishButton}
                  onClick={() => handleToggleStatus(job.id)}>
                  {job.statut_offre === 'Publié' ? 'Dépublier' : 'Publier'}
                </button>
                <button className={styles.deleteButton} onClick={() => handleDelete(job.id)}>Supprimer</button>
                
              </div>
            </div>
          ))}
        </div>
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Publier une Offre"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2>Publier une nouvelle Offre</h2>
        <form onSubmit={handleSubmit}>
          <label>Intitulé:</label>
          <input type="text" name='intitulé' value={newJob.intitulé} onChange={handleInputChange} required />
          <label>Description:</label>
          <textarea name='description'  value={newJob.description} onChange={handleInputChange} required></textarea>
          <label>Département:</label>
          <input type="text" name='departement'  value={newJob.departement} onChange={handleInputChange} required />
          <label>Type d'offre:</label>
          <input type="text" name='type_offre'  value={newJob.type_offre} onChange={handleInputChange} required />
          <label>Date Butoir:</label>
          <input type="text" name='date_butoir'  value={newJob.date_butoir} onChange={handleInputChange} required />
          <button type="submit">Publier</button>
        </form>
        <button type="close" onClick={closeModal}>Fermer</button>
      </Modal>
    </div>
  );
};

export default Dashboard;
