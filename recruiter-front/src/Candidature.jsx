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
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import styles from './Candidature.module.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className={styles.candidatureContainer}>
      <header className={styles.candidatureHeader}>
        <h1>Développeur Front-end</h1>
        <p>INTERNSHIP - 70H / SEMAINE</p>
        <a href="#description" className={styles.candidatureBackLink}>Retour à la description de l'offre</a>
      </header>
       
      <div className={styles.candidatureContent}>
      <form class={styles.candidatureForm}>
            <table  width="70%" align="center">
                <th >
                    <h2>Informations générales</h2>  
                </th>
                <tr>
                    <td><label >Prénom</label></td>
                    <td><input type="text" name="prenom" required/></td>
                </tr>
                <tr>
                    <td><label >Nom</label></td>
                    <td><input type="text" name="nom" required/></td>
                </tr>
                <tr>
                    <td><label >Date de naissance</label></td>
                    <td><input type="text" name="date_naissance" required/></td>
                </tr>
                <tr>
                    <td><label >Email</label></td>
                    <td><input type="text" name="email" required/></td>
                </tr>
                <tr>
                    <td><label >Téléphone</label></td>
                    <td><input type="text" name="telephone" required/></td>
                </tr>
                <tr>
                    <td><label >Adresse</label></td>
                    <td><input type="text" name="adresse" required/></td>
                </tr>
                <tr>
                    <td><label >Sexe</label></td>
                    <td><label>
            <input type="radio" name="genre" value="femme" />Féminin</label></td>
                    <td><label>
            <input type="radio" name="genre" value="homme" /> Masculin</label></td>
                </tr>
                <tr >
                    <td ><h2>Votre Profil *</h2></td>
                </tr>
                <tr>
                    <td><label >+ Curriculum Vitae</label></td>
                    <td><label >+ Lettre de motivation</label></td>
                    <td><label >+ Diplômes requis</label></td>
                    
                </tr>
                <tr>
                    <td><input type="file" name="cv" accept="application/pdf" required/></td>
                    <td><input type="file" name="lettre_motivation" accept="application/pdf" required/></td>
                    <td><input type="file" name="diplomes" accept="application/pdf" required/></td>
                </tr>
                <tr >
                    <td colspan="2"><p class="note">*Taille maximum 5Mo, format PDF</p></td>
                    
                </tr>
                <tr >
                    <td></td>
                    <td colspan="2"><button type="submit" className={styles.candidatureButton}>ENVOYER MA CANDIDATURE</button></td>
                    
                </tr>
            </table>
          
         
        </form>
      </div>
      <footer>
        <div className={styles.candidatureFooterLinks}>
          <a href="#"><Link to="/">Accueil</Link></a>
          <a href="#">Contact Us</a>
          <a href="#">Mentions légales</a>
          <a href="#">Politique de confidentialité</a>
          <div className={styles.candidatureSocialIcons}>
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