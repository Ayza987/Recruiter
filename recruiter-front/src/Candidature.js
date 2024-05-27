/*
 *   Copyright (c) 2024 
 *   All rights reserved.
 */
/**
 * @file Candidature.js
 * @description 
 * @author 
 * @copyright 
 */

import React from 'react';
import './Candidature.css';

function App() {
  return (
    <div className="container">
      <header>
        <h1>Développeur Front-end</h1>
        <p>INTERNSHIP - 70H / SEMAINE</p>
        <a href="#description" className="back-link">Retour à la description de l'offre</a>
      </header>
       
      <div className="App-container">
      <form className="form">
        <h2>Informations générales</h2>
        <label>Prénom</label> <input type="text" name="prenom" />

        <label>Nom</label> <input type="text" name="nom" />

        <label>Date de naissance</label>
        <input type="date" name="date_naissance" />

        <label>Email</label>
        <input type="email" name="email" />

        <label>Téléphone</label>
        <input type="tel" name="telephone" />

        <label>Adresse</label>
        <input type="text" name="adresse" />

        <label>Genre</label>
        <div className="gender">
          <label>
            <input type="radio" name="genre" value="femme" />
            Femme
          </label>
          <label>
            <input type="radio" name="genre" value="homme" />
            Homme
          </label>
        </div>

        <h2>Votre Profil *</h2>
        <div className="file-upload">
          <label>+ Curriculum Vitae</label>
          <input type="file" name="cv" accept="application/pdf" />
          {/* <p>Aucun fichier choisi</p> */}
        </div>

        <div className="file-upload">
          <label>+ Lettre de motivation</label>
          <input type="file" name="lettre_motivation" accept="application/pdf" />
          {/* <p>Aucun fichier choisi</p> */}
        </div>

        <div className="file-upload">
          <label>+ Diplômes requis</label>
          <input type="file" name="diplomes" accept="application/pdf" />
          {/* <p>Aucun fichier choisi</p> */}
        </div>

        <p className="note">*Taille maximum 5Mo, format PDF</p>

        <button type="submit">ENVOYER MA CANDIDATURE</button>
      </form>
      </div>
    </div>
  );
}

export default App;
