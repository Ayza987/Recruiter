/*
 *   Copyright (c) 2024 
 *   All rights reserved.
 */
/**
 * @file Connexion.js
 * @description 
 * @author 
 * @copyright 
 */

import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import styles from './Connexion.module.css'; 
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className={styles.connexionApp}>
      <div className={styles.connexionContent}>
        <div className={styles.connexionFormContainer}>
        <h2>Connexion</h2>
          <form>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" />
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" />
            <div className={styles.checkboxContainer}>
              <label htmlFor="terms">
              <a href="#">Mot de passe oublié ?</a>
              </label>
            </div>
            <button type="submit">Se connecter</button>
            <div className={styles.connexionContainer}>
            <label htmlFor="text">
                Pas encore de compte ? <a href="#"><Link to="/inscription">Inscrivez-vous</Link></a>
              </label>
              </div>
          </form>
        </div>
      </div>
      <footer>
        <div className={styles.connexionFooterLinks}>
        <a href="#"><Link to="/">Accueil</Link></a>
          <a href="#">Contact Us</a>
          <a href="#">Mentions légales</a>
          <a href="#">Politique de confidentialité</a>
          <div className={styles.ConnexionSocialIcons}>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaLinkedinIn /></a>
          <a href="#"><FaFacebookF /></a>
        </div>
        </div>
       
      </footer>
    </div>
  );
}

export default App;
