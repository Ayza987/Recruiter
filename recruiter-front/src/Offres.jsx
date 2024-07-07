/*
 *   Copyright (c) 2024 
 *   All rights reserved.
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Offres.module.css';
import offer from './offer.jpg';

const Offres = () => {
  const [offres, setOffres] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/offre/publish')
      .then(response => {
        if (response.status === 200 && response.data.offres && response.data.offres.length > 0) {
          setOffres(response.data.offres);
        } else {
          setError('Il n\'y a pas d\'offres disponibles pour l\'instant');
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setError('Il n\'y a pas d\'offres disponibles pour l\'instant');
        } else {
          setError('Une erreur s\'est produite lors de la récupération des offres');
        }
        console.error('There was an error!', error);
      });
  }, []);

  const handlePostuler = (intitule) => {
    navigate('/candidature', { state: { intitule } });
  };

  return (
    <div className={styles.offresContainer}>
      <header className={styles.offresHeader}>
        <h1>Nous Recrutons!</h1>
      </header>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {offres.map((offre, index) => (
        <section key={index} className={styles.offre}>
          <h2>{offre.intitulé}</h2>
          <h3><u>Description du poste</u></h3>
          <p>{offre.description}</p>
          <p>Offre valide jusqu'à la date : <strong>{offre.date_butoir}</strong></p>
          <h4>Type d'offre : {offre.type_offre}</h4>
          <button className={styles.postulerBtn} onClick={() => handlePostuler(offre.intitulé)}>Postuler</button>
        </section>
      ))}
      <footer className={styles.offresFooter}>
        <div className={styles.offresFooterLinks}>
          <a href="#"><Link to="/">Accueil</Link></a>
          <a href="https://www.gsc-technology.com/contact/">Contact Us</a>
          <a href="#">Mentions légales</a>
          <a href="#">Politique de confidentialité</a>
        </div>
        <div className={styles.offresSocialIcons}>
          <a href="#"><FaInstagram /></a>
          <a href="https://td.linkedin.com/company/global-soft-and-communication"><FaLinkedinIn /></a>
          <a href="https://m.facebook.com/Global-Soft-and-Communication-101543078277756/"><FaFacebookF /></a>
        </div>
      </footer>
    </div>
  );
};

export default Offres;
