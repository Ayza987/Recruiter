





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import styles from './View.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaTasks, FaChartBar, FaQuestionCircle, FaSignOutAlt, FaChartLine, FaChartPie } from 'react-icons/fa';

const View = () => {
  const navigate = useNavigate();
  const [candidatures, setCandidatures] = useState([]);
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
const [selectedJob, setSelectedJob] = useState(null);
const [action, setAction] = useState(''); 

  const [search, setSearch] = useState('');
  const [offreMaxCandidatures, setOffreMaxCandidatures] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/candidat')
      .then(response => {
        setCandidatures(response.data.candidats);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredJobs = candidatures.filter(job =>
    job.nom.toLowerCase().includes(search.toLowerCase()) ||
    job.prenom.toLowerCase().includes(search.toLowerCase()) ||
    job.email.toLowerCase().includes(search.toLowerCase()) ||
    job.telephone.toLowerCase().includes(search.toLowerCase()) ||
    job.Adresse.toLowerCase().includes(search.toLowerCase()) ||
    job.statut.toLowerCase().includes(search.toLowerCase()) ||
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

  const openConfirmModal = (job, actionType) => {
    setSelectedJob(job);
    setAction(actionType);
    setConfirmModalIsOpen(true);
  };
  
  const closeConfirmModal = () => {
    setSelectedJob(null);
    setAction('');
    setConfirmModalIsOpen(false);
  };
  


  const handleApprove = (job) => {
    axios.post(`http://127.0.0.1:8000/candidat/${job.id}/approve`, {
      email: job.email,
      name: job.prenom,
      surname: job.nom,
      offer: job.intitule
    })
    .then(response => {
      alert(response.data.message);
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        alert('Vous ne pouvez pas effectuer cette action');
      } else {
        console.error('Erreur lors de l\'envoi', error);
        alert('Erreur lors de l\'envoi');
      }
    });
  };
  
  const handleReject = (job) => {
    axios.post(`http://127.0.0.1:8000/candidat/${job.id}/reject`, {
      email: job.email,
      name: job.prenom,
      surname: job.nom,
      offer: job.intitule
    })
    .then(response => {
      alert(response.data.message);
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        alert('Vous ne pouvez pas effectuer cette action');
      } else {
        console.error('Erreur lors de l\'envoi', error);
        alert('Erreur lors de l\'envoi');
      }
    });
  };
  

  useEffect(() => {
    if (filteredJobs.length > 0) {
      const offreCandidatures = filteredJobs.reduce((acc, job) => {
        if (acc[job.intitule]) {
          acc[job.intitule]++;
        } else {
          acc[job.intitule] = 1;
        }
        return acc;
      }, {});

      const offreMax = Object.keys(offreCandidatures).reduce((a, b) =>
        offreCandidatures[a] > offreCandidatures[b] ? a : b
      );

      setOffreMaxCandidatures(offreMax);
    }
  }, [filteredJobs]);

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
              </li>
            </span>
            <li>
              <Link to="/Calendar">
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
              <button className={styles.logout}>Déconnexion</button>
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

          <div className={styles.viewStat}>
            <div className={styles.Charts}>
              <p className={styles.chartsIcons}><FaChartLine /></p>
              Nombre total de candidatures :
              <p><span>{filteredJobs.length}</span></p>
            </div>

            <div className={styles.Charts}>
              <p className={styles.chartsIcons}><FaChartPie /></p>
              Offre ayant reçu le plus de candidatures :
              <p><span>{offreMaxCandidatures}</span></p>
            </div>
          </div>

          <div className={styles.calendarTable}>
            <table className={styles.jobTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Adresse</th>
                  <th>Offre</th>
                  <th>Statut</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map(job => (
                  <tr key={job.id}>
                    <td data-label="ID">{job.id}</td>
                    <td data-label="Nom">{job.nom}</td>
                    <td data-label="Prénom">{job.prenom}</td>
                    <td data-label="Email">{job.email}</td>
                    <td data-label="Téléphone">{job.telephone}</td>
                    <td data-label="Adresse">{job.Adresse}</td>
                    <td data-label="Offre">{job.intitule}</td>
                    <td data-label="Statut">{job.statut}</td>
                    <td data-label="Action">
                       <span className={styles.buttons}>
                       <button className={styles.approveButton} onClick={() => openConfirmModal(job, 'approve')}>Approuver</button>
                       <button className={styles.rejectButton} onClick={() => openConfirmModal(job, 'reject')}>Rejeter</button>
                       </span>
                       </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Modal
  isOpen={confirmModalIsOpen}
  onRequestClose={closeConfirmModal}
  contentLabel="Confirmer l'action"
  className={styles.modal}
  overlayClassName={styles.overlay}
>
  <h2>Confirmer {action === 'approve' ? 'l\'approbation' : 'le rejet'}</h2>
  <p>Êtes-vous sûr de vouloir {action === 'approve' ? 'approuver' : 'rejeter'} ce candidat ?</p>
  <div className={styles.modalButtons}>
    <button type="submit" onClick={() => {
      if (action === 'approve') {
        handleApprove(selectedJob);
      } else {
        handleReject(selectedJob);
      }
      closeConfirmModal();
    }}>
      {action === 'approve' ? 'Approuver' : 'Rejeter'}
    </button>
    <button type="button" onClick={closeConfirmModal}>Annuler</button>
  </div>
</Modal>

    </div>
  );
};

export default View;
