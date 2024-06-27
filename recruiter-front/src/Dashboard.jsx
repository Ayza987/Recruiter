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
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
const [selectedJob, setSelectedJob] = useState(null);
const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState(false);
const [selectedJobToDelete, setSelectedJobToDelete] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    intitulé: '',
    description: '',
    departement: '',
    statut_offre: '',
    date_butoir: '',
    type_offre: '',

  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    axios.get('http://127.0.0.1:8000/offre')
      .then(response => {
        console.log(response);
        setJobs(response.data.offres);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
    if (e.target.value === '') {
      fetchJobs();
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
          }
        });
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
        fetchJobs();
      })
      .catch(error => {
        console.error(error);
        window.alert('Erreur, veuillez réessayer.');
      });
  };

  const handleToggleStatus = (id) => {
    axios.put(`http://127.0.0.1:8000/offre/${id}/toggle-status`)
      .then(response => {
        fetchJobs();
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


  const openConfirmDeleteModal = (job) => {
    setSelectedJobToDelete(job);
    setConfirmDeleteModalIsOpen(true);
  };
  
  const closeConfirmDeleteModal = () => {
    setSelectedJobToDelete(null);
    setConfirmDeleteModalIsOpen(false);
  };
  
  const confirmDelete = () => {
    axios.delete(`http://127.0.0.1:8000/offre/${selectedJobToDelete.id}/delete`)
      .then(response => {
        console.log(response.data);
        fetchJobs();
        closeConfirmDeleteModal();
      })
      .catch(error => {
        console.error(error);
        window.alert('Erreur, veuillez réessayer.');
      });
  };
  
  

const openEditModal = (job) => {
  setSelectedJob(job);
  setEditModalIsOpen(true);
};

const closeEditModal = () => {
  setEditModalIsOpen(false);
  setSelectedJob(null);
};

const handleUpdate = (e) => {
  e.preventDefault();
  axios.put(`http://127.0.0.1:8000/offre/${selectedJob.id}/edit`, selectedJob)
    .then(response => {
      console.log(response.data);
      closeEditModal();
      fetchJobs(); 
    })
    .catch(error => {
      console.error(error);
      window.alert('Erreur, veuillez réessayer.');
    });
};

const handleEditInputChange = (e) => {
  setSelectedJob({ ...selectedJob, [e.target.name]: e.target.value });
};




  const handleInputChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

    axios.post('http://127.0.0.1:8000/offre',newJob)
      .then(response => {
        console.log(response.data);
        closeModal();
        fetchJobs(); 
      })
      .catch(error => {
        console.error(error);
        window.alert('Erreur, veuillez réessayer.');
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
              <Link to="/Calendar">
                <FaTasks />
                <span className={styles.dashboardNavItem}>Gestion des congés</span>
              </Link>
            </li>
            <li> <div className={styles.selected}> <a href="/Dashboard">
                <FaChartBar />
                <span className={styles.dashboardNavItem}>Offres d'emploi</span>
              </a></div>
              
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
              <button className={styles.logout}>Déconnexion</button>
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
            <a href="http://localhost:3000/Offres">See all</a>
           
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
              <button className={styles.deleteButton} onClick={() => openEditModal(job)}>Modifier</button>
                <button
                  className={styles.publishButton}
                  onClick={() => handleToggleStatus(job.id)}>
                  {job.statut_offre === 'Publié' ? 'Dépublier' : 'Publier'}
                </button>
                <button className={styles.deleteButton} onClick={() => openConfirmDeleteModal(job)}>Supprimer</button>

                
                
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
          <select className={styles.dashboardFilter} name='departement' value={newJob.departement} onChange={handleInputChange} required>
              <option value="Soft">Soft</option>
              <option value="Bon Comptoir">Bon Comptoir</option>
              <option value="Marketing">Marketing</option>
              <option value="Technique">Technique</option>
            </select>
          <label>Type d'offre:</label>
          <select className={styles.dashboardFilter} name="type_offre" value={newJob.type_offre} onChange={handleInputChange} required>
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Stage professionel">Stage professionel</option>
              <option value="Stage académique">Stage académique</option>
            </select>
          <label>Date Butoir:</label>
          <input type="date" name='date_butoir'  value={newJob.date_butoir} onChange={handleInputChange} required />
          <button type="submit">Publier</button>
        </form>
        {/* <button type="close" onClick={closeModal}>Fermer</button> */}
      </Modal>


      <Modal
  isOpen={editModalIsOpen}
  onRequestClose={closeEditModal}
  contentLabel="Modifier une Offre"
  className={styles.modal}
  overlayClassName={styles.overlay}
>
  <h2>Modifier une Offre</h2>
  {selectedJob && (
    <form onSubmit={handleUpdate}>
      <label>Intitulé:</label>
      <input type="text" name="intitulé" value={selectedJob.intitulé} onChange={handleEditInputChange} required />
      <label>Description:</label>
      <textarea name="description" value={selectedJob.description} onChange={handleEditInputChange} required></textarea>
      <label>Département:</label>
      <select className={styles.dashboardFilter} name="departement" value={selectedJob.departement} onChange={handleEditInputChange} required>
        <option value="Soft">Soft</option>
        <option value="Bon Comptoir">Bon Comptoir</option>
        <option value="Marketing">Marketing</option>
        <option value="Technique">Technique</option>
      </select>
      <label>Type d'offre:</label>
      <select className={styles.dashboardFilter} name="type_offre" value={selectedJob.type_offre} onChange={handleEditInputChange} required>
        <option value="CDI">CDI</option>
        <option value="CDD">CDD</option>
        <option value="Stage professionel">Stage professionel</option>
        <option value="Stage académique">Stage académique</option>
      </select>
      <label>Date Butoir:</label>
      <input type="date" name="date_butoir" value={selectedJob.date_butoir} onChange={handleEditInputChange} required />
      <button type="submit">Enregistrer les modifications</button>
    </form>
  )}
  
</Modal>

<Modal
  isOpen={confirmDeleteModalIsOpen}
  onRequestClose={closeConfirmDeleteModal}
  contentLabel="Confirmer la suppression"
  className={styles.modal}
  overlayClassName={styles.overlay}
>
  <h2>Confirmer la suppression</h2>
  <p>Êtes-vous sûr de vouloir supprimer cette offre ?</p>
  <div className={styles.modalButtons}>
    <button type="button" onClick={confirmDelete}>Supprimer</button>
    <button type="button" onClick={closeConfirmDeleteModal}>Annuler</button>
  </div>
</Modal>

    </div>
  );


};

export default Dashboard;
