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
import { useLocation, Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import styles from './Candidature.module.css';
import axios from 'axios';

const Candidature = () => {
  const location = useLocation();
  const { intitule } = location.state || {};
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    Date_de_naissance: '',
    telephone: '',
    Adresse: '',
    cv: null,
    lettre_motivation: null,
    diplomes: null,
    intitule: intitule || 'Intitulé non spécifié'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const validateForm = () => {
    const nameRegex = /^[a-zA-ZÀ-ÿ\s-]+$/;
    const phoneRegex = /^[0-9]{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(formData.nom) || !nameRegex.test(formData.prenom) || !nameRegex.test(formData.Adresse)) {
      alert("Le nom, le prénom et l'adresse ne doivent pas contenir de caractères spéciaux.");
      return false;
    }
    if (!phoneRegex.test(formData.telephone)) {
      alert("Le numéro de téléphone doit contenir exactement 9 chiffres.");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      alert("L'email doit contenir un '@' et un domaine valide.");
      return false;
    }
    if (formData.cv && formData.cv.type !== 'application/pdf') {
      alert("Le CV doit être au format PDF.");
      return false;
    }
    if (formData.lettre_motivation && formData.lettre_motivation.type !== 'application/pdf') {
      alert("La lettre de motivation doit être au format PDF.");
      return false;
    }
    if (formData.diplomes && formData.diplomes.type !== 'application/pdf') {
      alert("Les diplômes doivent être au format PDF.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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
        window.location.reload();
        alert("Votre candidature a été envoyée avec succès, vous recevrez un mail de confirmation");
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 422) {
            alert("Veuillez vérifier vos informations.");
          } else if (error.response.status === 500) {
            alert("Erreur d'envoi.");
          }
        } else {
          console.error(error);
        }
      });

    axios.post('http://127.0.0.1:8000/upload', fileData, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className={styles.candidatureContainer}>
      <header className={styles.candidatureHeader}>
        <h1>{intitule || 'Postuler à cette offre'}</h1>
        <p>OFFRE D'EMPLOI - 70H / SEMAINE</p>
        <a href="/offres" className={styles.candidatureBackLink}>Retour à la description de l'offre</a>
      </header>
      <div className={styles.candidatureContent}>
        <form onSubmit={handleSubmit} className={styles.candidatureForm}>
          <table width="70%" align="center">
            <thead>
              <tr>
                <th>
                  <h2>Informations générales</h2>  
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><label>Prénom</label></td>
                <td><input type="text" name="prenom" onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label>Nom</label></td>
                <td><input type="text" name="nom" onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label>Date de naissance</label></td>
                <td><input type="date" name="Date_de_naissance" placeholder='aaaa/mm/jj' onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label>Email</label></td>
                <td><input type="text" name="email" onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label>Téléphone</label></td>
                <td><input type="text" name="telephone" onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label>Adresse</label></td>
                <td><input type="text" name="Adresse" onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label>Sexe</label></td>
                <td>
                  <label>
                    <input type="radio" name="genre" onChange={handleChange} value="femme" /> Féminin
                  </label>
                </td>
                <td>
                  <label>
                    <input type="radio" name="genre" onChange={handleChange} value="homme" /> Masculin
                  </label>
                </td>
              </tr>
              <tr>
                <td colSpan="2"><h2>Votre Profil *</h2></td>
              </tr>
              <tr>
                <td><label>+ Curriculum Vitae</label></td>
                <td><label>+ Lettre de motivation</label></td>
                <td><label>+ Diplômes requis</label></td>
              </tr>
              <tr>
                <td><input type="file" name="cv" accept="application/pdf" onChange={handleFileChange} required /></td>
                <td><input type="file" name="lettre_motivation" accept="application/pdf" onChange={handleFileChange} required /></td>
                <td><input type="file" name="diplomes" accept="application/pdf" onChange={handleFileChange} required /></td>
              </tr>
              <tr>
                <td colSpan="3"><p className="note">*Taille maximum 5Mo, format PDF</p></td>
              </tr>
              <tr>
                <td></td>
                <td colSpan="2"><button type="submit" className={styles.candidatureButton}>ENVOYER MA CANDIDATURE</button></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <footer>
        <div className={styles.candidatureFooterLinks}>
          <a href="#"><Link to="/">Accueil</Link></a>
          <a href="https://www.gsc-technology.com/contact/">Contact Us</a>
          <a href="#">Mentions légales</a>
          <a href="#">Politique de confidentialité</a>
          <div className={styles.candidatureSocialIcons}>
            <a href="#"><FaInstagram /></a>
            <a href="https://td.linkedin.com/company/global-soft-and-communication"><FaLinkedinIn /></a>
            <a href="https://m.facebook.com/Global-Soft-and-Communication-101543078277756/"><FaFacebookF /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Candidature;
