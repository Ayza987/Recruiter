/*
 *   Copyright (c) 2024 
 *   All rights reserved.
 */
import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import './App.css'; 
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className="content">
        <div className="header">
          <h2>Créez votre compte</h2>
          <h2>GSC Recruiter</h2>
          <p>Déjà un compte ? <a href="#"><Link to="/connexion">Connectez vous</Link></a></p>
        </div>
        <div className="form-container">
          <form>
            <label htmlFor="nom">Nom</label>
            <input type="text" id="nom" />
            <label htmlFor="prenom">Prénom</label>
            <input type="text" id="prenom" />
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" />
            <label htmlFor="telephone">Téléphone</label>
            <input type="tel" id="telephone" />
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="poste">Poste</label>
                <input type="text" id="poste" />
              </div>
              <div class="form-group-department">
        <select id="departement" title= 'Département' name="departement">
          <option value="dept1">Département Marketing</option>
          <option value="dept3">Département Bon Comptoir</option>
          <option value="dept3">Département Technique</option>
          <option value="dept2">Département Soft</option>
        </select>
              </div>
            </div>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" />
            <div className="checkbox-container">
              <input type="radio" id="terms" />
              <label htmlFor="terms">
                J'ai lu et j'accepte les <a href="#">conditions générales de confidentialité</a>
              </label>
            </div>
            <button type="submit">S'inscrire</button>
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
