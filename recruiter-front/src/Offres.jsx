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
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/offre')
      .then(response => {
        setOffres(response.data.offres);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const handlePostuler = (intitule) => {
    navigate('/candidature', { state: { intitule } });
  };

  return (
    <div className={styles.offresContainer}>
      <header className={styles.offresHeader}>
        <h1>We Recruit!</h1>
      </header>
      {offres.map((offre, index) => (
        <section key={index} className={styles.offre}>
          <h2>{offre.intitulé}</h2>
          <h3> <u>Description du poste </u></h3>
          <p>{offre.description}</p>
          <h3>Offre valide jusqu'à la date :  </h3>
          <p> {offre.date_butoir} </p>
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
