/*
 *   Copyright (c) 2024 
 *   All rights reserved.
 */
/**
 * @file Connexion.js
 * @description Formulaire de connexion
 * @author 
 * @copyright 
 */

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import styles from './Connexion.module.css'; 
import { Link } from 'react-router-dom';

function Connexion() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/auth/login', formData)
      .then(response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.access_token); 
        navigate('/dashboard'); 
      })
      .catch(error => {
        console.error(error);
        window.alert('Erreur lors de la connexion. Veuillez vérifier vos informations.');
      });
  };

  return (
    <div className={styles.connexionApp}>
      <div className={styles.connexionContent}>
        <div className={styles.connexionFormContainer}>
          <h2>Connexion</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" onChange={handleChange} />
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" onChange={handleChange} />
            <div className={styles.checkboxContainer}>
              <label htmlFor="terms">
                {/* <a href="#">Mot de passe oublié ?</a> */}
              </label>
            </div>
            <button type="submit">Se connecter</button>
            <div className={styles.connexionContainer}>
              <label htmlFor="text">
                Pas encore de compte ? <Link to="/inscription">Inscrivez-vous</Link>
              </label>
            </div>
          </form>
        </div>
      </div>
      <footer>
        <div className={styles.connexionFooterLinks}>
          <Link to="/">Accueil</Link>
          <a href="https://www.gsc-technology.com/contact/">Contact Us</a>
          <a href="#">Mentions légales</a>
          <a href="#">Politique de confidentialité</a>
          <div className={styles.ConnexionSocialIcons}>
            <a href="#"><FaInstagram /></a>
            <a href="https://td.linkedin.com/company/global-soft-and-communication"><FaLinkedinIn /></a>
            <a href="https://m.facebook.com/Global-Soft-and-Communication-101543078277756/"><FaFacebookF /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Connexion;
