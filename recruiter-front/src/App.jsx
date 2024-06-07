/*
 *   Copyright (c) 2024 
 *   All rights reserved.
 */
import React, { useState } from 'react';
import axios from 'axios';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import styles from './App.module.css'; 

function App() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    poste: '',
    password: '',
    terms: false,
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [id]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:8000/personnel', formData)
      .then(response => {
        console.log(response.data);
        navigate('/connexion'); 
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.appContent}>
        <div className={styles.appHeader}>
          <h2>Créez votre compte</h2>
          <h2>GSC Recruiter</h2>
          <p>Déjà un compte ? <a href="#"><Link to="/connexion">Connectez-vous</Link></a></p>
        </div>
        <div className={styles.appFormContainer}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="nom">Nom</label>
            <input type="text" id="nom" onChange={handleChange} />
            <label htmlFor="prenom">Prénom</label>
            <input type="text" id="prenom" onChange={handleChange} />
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" onChange={handleChange} />
            <label htmlFor="telephone">Téléphone</label>
            <input type="tel" id="telephone" onChange={handleChange} />
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="poste">Poste</label>
                <input type="text" id="poste" onChange={handleChange} />
              </div>
              <div className={styles.appFormGroupDepartment}>
                <select id="departement" title='Département' name="departement" onChange={handleChange}>
                  <option value="dept1">Département Marketing</option>
                  <option value="dept3">Département Bon Comptoir</option>
                  <option value="dept3">Département Technique</option>
                  <option value="dept2">Département Soft</option>
                </select>
              </div>
            </div>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" onChange={handleChange} />
            <div className={styles.checkboxContainer}>
              <input type="checkbox" id="terms" onChange={handleChange} />
              <label htmlFor="terms">
                J'ai lu et j'accepte les <a href="#">conditions générales de confidentialité</a>
              </label>
            </div>
            <button type="submit">S'inscrire</button>
          </form>
        </div>
      </div>
      <footer>
        <div className={styles.appFooterLinks}>
          <a href="#"><Link to="/">Accueil</Link></a>
          <a href="https://www.gsc-technology.com/contact/">Contact Us</a>
          <a href="#">Mentions légales</a>
          <a href="#">Politique de confidentialité</a>
        </div>
        <div className={styles.appSocialIcons}>
          <a href="#"><FaInstagram /></a>
          <a href="https://td.linkedin.com/company/global-soft-and-communication"><FaLinkedinIn /></a>
          <a href="https://m.facebook.com/Global-Soft-and-Communication-101543078277756/"><FaFacebookF /></a>
        </div>
      </footer>
    </div>
  );
}

export default App;
