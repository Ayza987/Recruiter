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

import React, { useState } from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import styles from './Candidature.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Candidature() {
    const [formData, setFormData] = useState({
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      adresse: '',
      genre: '',
      cv: null,
      lettre_motivation: null,
      diplomes: null
    });

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };


  const handleSubmit = (e) => {
    e.preventDefault();


    const formDataToSend = new FormData(); 
    const fileData = new FormData(); 


    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    fileData.append('cv', formData.cv);
    fileData.append('diplomes', formData.diplomes);
    fileData.append('lettre_motivation', formData.lettre_motivation);

  
    axios.post('http://127.0.0.1:8000/candidat', formDataToSend)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    
   
    axios.post('http://127.0.0.1:8000/upload', fileData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
      

  return (
    <div className={styles.candidatureContainer}>
      <header className={styles.candidatureHeader}>
        <h1>Développeur Front-end</h1>
        <p>INTERNSHIP - 70H / SEMAINE</p>
        <a href="#description" className={styles.candidatureBackLink}>Retour à la description de l'offre</a>
      </header>
       
      <div className={styles.candidatureContent}>
      <form onSubmit={handleSubmit} class={styles.candidatureForm}>
            <table  width="70%" align="center">
                <th >
                    <h2>Informations générales</h2>  
                </th>
                <tr>
                    <td><label >Prénom</label></td>
                    <td><input type="text" name="prenom" onChange={handleChange} required/></td>
                </tr>
                <tr>
                    <td><label >Nom</label></td>
                    <td><input type="text" name="nom" onChange={handleChange} required/></td>
                </tr>
                <tr>
                    <td><label >Date de naissance</label></td>
                    <td><input type="text" name="date_de_naissance"  placeholder='aaaa/mm/jj' onChange={handleChange} required/></td>
                </tr>
                <tr>
                    <td><label >Email</label></td>
                    <td><input type="text" name="email"  onChange={handleChange} required/></td>
                </tr>
                <tr>
                    <td><label >Téléphone</label></td>
                    <td><input type="text" name="telephone"  onChange={handleChange} required/></td>
                </tr>
                <tr>
                    <td><label >Adresse</label></td>
                    <td><input type="text" name="adresse" onChange={handleChange} required/></td>
                </tr>
                <tr>
                    <td><label >Sexe</label></td>
                    <td><label>
            <input type="radio" name="genre" onChange={handleChange} value="femme" />Féminin</label></td>
                    <td><label>
            <input type="radio" name="genre" onChange={handleChange} value="homme" /> Masculin</label></td>
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
                    <td><input type="file" name="cv" accept="application/pdf"  onChange={handleFileChange} required/></td>
                    <td><input type="file" name="lettre_motivation" accept="application/pdf" onChange={handleFileChange} required/></td>
                    <td><input type="file" name="diplomes" accept="application/pdf" onChange={handleFileChange} required/></td>
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

export default Candidature;