import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Calendar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaTasks, FaChartBar, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';

const Calendar = () => {
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

  const filteredJobs = jobs.filter(job => 
    job.nom.toLowerCase().includes(search.toLowerCase()) || 
    job.prenom.toLowerCase().includes(search.toLowerCase()) ||
    job.email.toLowerCase().includes(search.toLowerCase()) ||
    job.telephone.toLowerCase().includes(search.toLowerCase()) ||
    job.Adresse.toLowerCase().includes(search.toLowerCase()) ||
    job.intitule.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.calendarContainer}>
      <nav className={styles.calendarNav}>
        <div className={styles.calendarNavbar}>
          <div className={styles.calendarLogo}>
            <h1>calendar</h1>
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
              placeholder="Search job here..." 
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <div className={styles.calendarRow}>
            <p>Il y a <span>{filteredJobs.length}</span> candidature(s).</p>
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
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map(job => (
                  <tr key={job.id}>
                    <td>{job.id}</td>
                    <td>{job.nom}</td>
                    <td>{job.prenom}</td>
                    <td>{job.email}</td>
                    <td>{job.telephone}</td>
                    <td>{job.Adresse}</td>
                    <td>{job.intitule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calendar;
