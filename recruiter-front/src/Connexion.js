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
import './Connexion.css'; 
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className="content">
        <div className="header">
         
        </div>
        <div className="form-container">
        <h2>Connexion</h2>
          <form>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" />
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" />
            <div className="checkbox-container">
              <label htmlFor="terms">
              <a href="#">Mot de passe oublié ?</a>
              </label>
            </div>
            <button type="submit">Se connecter</button>
            <div className="container">
            <label htmlFor="text">
                Pas encore de compte ? <a href="#"><Link to="/">S'inscrire</Link></a>
              </label>
              </div>
          </form>
        </div>
      </div>
      <footer>
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Contact Us</a>
          <a href="#">Mentions légales</a>
          <a href="#">Politique de confidentialité</a>
          <div className="social-icons">
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
