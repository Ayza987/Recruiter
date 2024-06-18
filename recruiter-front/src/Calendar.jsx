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
import { FaUser, FaTasks, FaChartBar, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';

const Calendar = () => {
  const navigate = useNavigate();
  const [conges, setConges] = useState([]);
  const [search, setSearch] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newConge, setNewConge] = useState({
    nom_personnel: '',
    date_debut: '',
    date_fin: '',
    type_congés: '',
    statut_congés: ''
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/congés')
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
    conge.statut_congés.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewConge(prevState => ({
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
        // Re-fetch congés to include the new one
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
              <Link to="/Congés">
                <FaTasks />
                <span className={styles.calendarNavItem}>Gestion des congés</span>
              </Link>
            </li>
            <li>
              <a href="/calendar">
                <FaChartBar />
                <span className={styles.calendarNavItem}>Offres d'emploi</span>
              </a>
            </li>
            <li>
              <Link to="/calendar">
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
              <button className={styles.calendarNavItem}>Déconnexion</button>
            </li>
          </ul>
        </div>
      </nav>

      <section className={styles.calendarMain}>
        <div className={styles.calendarMainTop}>
          <p>GSC Recruiter</p>
        </div>
        <div className={styles.calendarMainBody}>
          <h1>Les congés</h1>

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
            <p>Il y a <span>{filteredConges.length}</span> congé(s).</p>
          </div>

          <div className={styles.calendarTable}>
            <table className={styles.jobTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Date de Début</th>
                  <th>Date de Fin</th>
                  <th>Type de Congés</th>
                  <th>Statut des Congés</th>
                </tr>
              </thead>
              <tbody>
                {filteredConges.map(conge => (
                  <tr key={conge.id}>
                    <td>{conge.id}</td>
                    <td>{conge.nom_personnel}</td>
                    <td>{conge.date_debut}</td>
                    <td>{conge.date_fin}</td>
                    <td>{conge.type_congés}</td>
                    <td>{conge.statut_congés}</td>
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
          <label>ID Personnel:</label>
          <input type="text" name='nom_personnel' value={newConge.id_personnel} onChange={handleInputChange} required />
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
        <button type="button" onClick={closeModal}>Fermer</button>
      </Modal>
    </div>
  );
};

export default Calendar;
