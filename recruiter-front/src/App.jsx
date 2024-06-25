/*
 *   Copyright (c) 2024 
 *   All rights reserved.
 */

import React, { useState } from 'react';
import axios from 'axios';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaEye, FaEyeSlash } from 'react-icons/fa';
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

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    const specialCharPattern = /[^a-zA-Z\s]/;
    const phonePattern = /^\d{9}$/;
    const passwordPattern = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    if (specialCharPattern.test(formData.nom) || /\d/.test(formData.nom)) {
      newErrors.nom = 'Le nom ne doit pas contenir de caractères spéciaux ou de chiffres.';
    }
    if (specialCharPattern.test(formData.prenom) || /\d/.test(formData.prenom)) {
      newErrors.prenom = 'Le prénom ne doit pas contenir de caractères spéciaux ou de chiffres.';
    }
    if (specialCharPattern.test(formData.poste) || /\d/.test(formData.poste)) {
      newErrors.poste = 'Le poste ne doit pas contenir de caractères spéciaux ou de chiffres.';
    }
    if (!phonePattern.test(formData.telephone)) {
      newErrors.telephone = 'Le numéro de téléphone doit contenir 9 chiffres.';
    }
    if (!passwordPattern.test(formData.password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères dont au moins un caractère spécial.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios.post('http://127.0.0.1:8000/personnel', formData)
        .then(response => {
          console.log(response.data);
          navigate('/connexion');
        })
        .catch(error => {
          if (error.response && error.response.status === 422) {
            setErrors({
              email: 'Adresse mail existante'
            });
          } else {
            console.error(error);
          }
        });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
            {errors.nom && <p className={styles.error}>{errors.nom}</p>}
            <label htmlFor="prenom">Prénom</label>
            <input type="text" id="prenom" onChange={handleChange} />
            {errors.prenom && <p className={styles.error}>{errors.prenom}</p>}
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" onChange={handleChange} />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
            <label htmlFor="telephone">Téléphone</label>
            <input type="tel" id="telephone" onChange={handleChange} />
            {errors.telephone && <p className={styles.error}>{errors.telephone}</p>}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="poste">Poste</label>
                <input type="text" id="poste" onChange={handleChange} />
                {errors.poste && <p className={styles.error}>{errors.poste}</p>}
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
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                onChange={handleChange}
              />
              <span
                className={styles.passwordToggle}
                onClick={toggleShowPassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <p className={styles.error}>{errors.password}</p>}
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
