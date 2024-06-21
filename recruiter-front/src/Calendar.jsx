/*
 *   Copyright (c) 2024 
 *   All rights reserved.
 */
/**
 * @file Calendar.jsx
 * @description 
 * @author 
 * @copyright 
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import styles from './Calendar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaTasks, FaChartBar, FaQuestionCircle, FaSignOutAlt, FaRegTrashAlt, FaRegEdit, FaChartLine, FaChartPie } from 'react-icons/fa';

const Calendar = () => {
  const navigate = useNavigate();
  const [conges, setConges] = useState([]);
  const [search, setSearch] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedCongeId, setSelectedCongeId] = useState(null);
  const [newConge, setNewConge] = useState({
    nom_personnel: '',
    email:'',
    date_debut: '',
    date_fin: '',
    type_congés: '',
    statut_congés: ''
  });
  const [editConge, setEditConge] = useState({
    id: '',
    nom_personnel: '',
     email:'',
    date_debut: '',
    date_fin: '',
    type_congés: '',
    statut_congés: ''
  });

  useEffect(() => {

    const token = localStorage.getItem('token');
    axios.get('http://127.0.0.1:8000/congés', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setConges(response.data.congés);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

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

  const filteredConges = conges.filter(conge => 
    conge.id.toString().includes(search) ||
    conge.nom_personnel.toString().includes(search) || 
    conge.date_debut.toLowerCase().includes(search.toLowerCase()) || 
    conge.date_fin.toLowerCase().includes(search.toLowerCase()) ||
    conge.type_congés.toLowerCase().includes(search.toLowerCase()) ||
    conge.statut_congés.toLowerCase().includes(search.toLowerCase()) ||
    conge.email.toLowerCase().includes(search.toLowerCase())
  );

  const nombreCongesEnCours = filteredConges.filter(conge => conge.statut_congés.toLowerCase() === 'en cours').length;

  let congesParPersonnel = {};
  let personnelMaxConges = '';
  let maxConges = 0;
if (filteredConges.length > 0) {
  congesParPersonnel = filteredConges.reduce((acc, conge) => {
    if (acc[conge.nom_personnel]) {
      acc[conge.nom_personnel]++;
    } else {
      acc[conge.nom_personnel] = 1;
    }
    return acc;
  }, {});

  personnelMaxConges = Object.keys(congesParPersonnel).reduce((a, b) =>
    congesParPersonnel[a] > congesParPersonnel[b] ? a : b
  );
  maxConges = congesParPersonnel[personnelMaxConges];
}



  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openEditModal = (conge) => {
    setEditConge(conge);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };

  const openConfirmDeleteModal = (id) => {
    setSelectedCongeId(id);
    setConfirmDeleteModalIsOpen(true);
  };

  const closeConfirmDeleteModal = () => {
    setSelectedCongeId(null);
    setConfirmDeleteModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewConge(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditConge(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedConge = {
      ...newConge,
      date_debut: new Date(newConge.date_debut).toISOString().split('T')[0],
      date_fin: new Date(newConge.date_fin).toISOString().split('T')[0]
    };
    axios.post('http://127.0.0.1:8000/congés', formattedConge)
      .then(response => {
        console.log(response.data);
        closeModal();
        axios.get('http://127.0.0.1:8000/congés')
          .then(response => {
            setConges(response.data.congés);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      })
      .catch(error => {
        console.error('Error adding congé:', error);
      });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formattedConge = {
      ...editConge,
      date_debut: new Date(editConge.date_debut).toISOString().split('T')[0],
      date_fin: new Date(editConge.date_fin).toISOString().split('T')[0]
    };
    axios.put(`http://127.0.0.1:8000/congés/${editConge.id}/edit`, formattedConge)
      .then(response => {
        console.log(response.data);
        closeEditModal();
        axios.get('http://127.0.0.1:8000/congés')
          .then(response => {
            setConges(response.data.congés);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      })
      .catch(error => {
        console.error('Error updating congé:', error);
      });
  };

  const handleDeleteConge = () => {
    axios.delete(`http://127.0.0.1:8000/congés/${selectedCongeId}/delete`)
      .then(response => {
        console.log(response.data);
        closeConfirmDeleteModal();
        setConges(conges.filter(conge => conge.id !== selectedCongeId));
      })
      .catch(error => {
        console.error('Error deleting congé:', error);
      });
  };

  return (
    <div className={styles.calendarContainer}>
      <nav className={styles.calendarNav}>
        <div className={styles.calendarNavbar}>
          <div className={styles.calendarLogo}>
            <h1>dashboard</h1>
          </div>
          <ul>
            <li>
              <Link to="/">
                <FaUser />
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/Calendar">
                <FaTasks />
                <span className={styles.calendarNavItem}>Gestion des congés</span>
              </Link>
            </li>
            <li>
              <a href="/dashboard">
                <FaChartBar />
                <span className={styles.calendarNavItem}>Offres d'emploi</span>
              </a>
            </li>
            <li>
              <Link to="/view">
                <FaTasks />
                <span className={styles.calendarNavItem}>Gestion des candidats</span>
              </Link>
            </li>
            <li>
              <a href="https://www.gsc-technology.com/contact/">
                <FaQuestionCircle />
                <span className={styles.calendarNavItem}>Contact</span>
              </a>
            </li>
            <li className={styles.logout} onClick={handleLogout}>
              <FaSignOutAlt />
              <button className={styles.logout}>Déconnexion</button>
            </li>
          </ul>
        </div>
      </nav>

      <section className={styles.calendarMain}>
        <div className={styles.calendarMainTop}>
          <p>GSC Recruiter</p>
        </div>
        <div className={styles.calendarMainBody}>
        <h1>Liste des congés</h1> <br />

          <div className={styles.calendarSearchBar}>
            <input 
              type="search" 
              placeholder="Rechercher un congé..." 
              value={search}
              onChange={handleSearchChange} 
            />
          </div>
          <div className={styles.calendarTagsBar}>
            <div className={styles.calendarTag}>
              <button className={styles.calendarButton} onClick={openModal}>Ajouter un congé</button>
            </div>
          </div>
          <div className={styles.calendarRow}>
            <p></p>
          </div>

          <div className={styles.calendarStat}>
            <div className={styles.Charts}>  
              <p className={styles.chartsIcons}><FaChartLine /></p>
              Nombre total de congés : 
              <p><span>{filteredConges.length}</span></p>
            </div>
            <div className={styles.Charts}> 
            <p className={styles.chartsIcons}><FaChartLine /></p>
              Nombre de congés en cours: 
              <p><span>{nombreCongesEnCours}</span></p> 
            </div>
            <div className={styles.Charts}> 
            <p className={styles.chartsIcons}><FaChartPie /></p>
              Personnel ayant pris le plus de congés : 
              <p><span>{personnelMaxConges}</span></p> 
            </div>


          </div>
          <br />

          <div className={styles.calendarTable}>
            <table className={styles.jobTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Date de Début</th>
                  <th>Date de Fin</th>
                  <th>Type de Congés</th>
                  <th>Statut des Congés</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredConges.map(conge => (
                  <tr key={conge.id}>
                    <td data-label='ID'>{conge.id}</td>
                    <td data-label='Nom'>{conge.nom_personnel}</td>
                    <td data-label='Email'>{conge.email}</td>
                    <td data-label='Date de début'>{conge.date_debut}</td>
                    <td data-label='Date de fin'>{conge.date_fin}</td>
                    <td data-label='Type de congés'>{conge.type_congés}</td>
                    <td data-label='Statut '>{conge.statut_congés}</td>
                    <td data-label='Action'>
                      <span className={styles.calendarIcons}>  <FaRegTrashAlt onClick={() => openConfirmDeleteModal(conge.id)} /> <br />
                      <FaRegEdit onClick={() => openEditModal(conge)} /></span>
                     
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Ajouter un nouveau congé"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2>Ajouter un nouveau congé</h2>
        <form onSubmit={handleSubmit}>
          <label>Nom :</label>
          <input type="text" name='nom_personnel' value={newConge.nom_personnel} onChange={handleInputChange} required />
          <label>Email :</label>
          <input type="email" name='email' value={newConge.email} onChange={handleInputChange} required />
          <label>Date de Début:</label>
          <input type="date" name='date_debut' value={newConge.date_debut} onChange={handleInputChange} required />
          <label>Date de Fin:</label>
          <input type="date" name='date_fin' value={newConge.date_fin} onChange={handleInputChange} required />
          <label>Type de Congés:</label>
          <input type="text" name='type_congés' value={newConge.type_congés} onChange={handleInputChange} required />
          <label>Statut des Congés:</label>
          <input type="text" name='statut_congés' value={newConge.statut_congés} onChange={handleInputChange} required />
          <button type="submit">Ajouter</button>
        </form>
      </Modal>

      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        contentLabel="Modifier le congé"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2>Modifier le congé</h2>
        <form onSubmit={handleEditSubmit}>
          <label>ID:</label>
          <input type="text" name='id' value={editConge.id} readOnly />
          <label>Nom:</label>
          <input type="text" name='nom_personnel' value={editConge.nom_personnel} onChange={handleEditInputChange} required />
          <label>Email :</label>
          <input type="email" name='email' value={newConge.email} onChange={handleInputChange} required />
          <label>Date de Début:</label>
          <input type="date" name='date_debut' value={editConge.date_debut} onChange={handleEditInputChange} required />
          <label>Date de Fin:</label>
          <input type="date" name='date_fin' value={editConge.date_fin} onChange={handleEditInputChange} required />
          <label>Type de Congés:</label>
          <input type="text" name='type_congés' value={editConge.type_congés} onChange={handleEditInputChange} required />
          <label>Statut des Congés:</label>
          <input type="text" name='statut_congés' value={editConge.statut_congés} onChange={handleEditInputChange} required />
          <button type="submit">Modifier</button>
          <button type="close" onClick={closeModal}>Annuler</button>
        </form>
      </Modal>

      <Modal
        isOpen={confirmDeleteModalIsOpen}
        onRequestClose={closeConfirmDeleteModal}
        contentLabel="Confirmer la suppression"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2>Confirmer la suppression</h2>
        <p>Êtes-vous sûr de vouloir supprimer ce congé ?</p>
        <div className={styles.modalButtons}>
          <button onClick={handleDeleteConge}>Supprimer</button> 
          <button onClick={closeConfirmDeleteModal}>Annuler</button>
        </div>
      </Modal>
    </div>
  );
};

export default Calendar;
