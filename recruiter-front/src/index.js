/*
 *   Copyright (c) 2024 
 *   All rights reserved.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import styles from './index.module.css';
import App from './App';
import Connexion from './Connexion';
import Dashboard from './Dashboard'; 
import Accueil from './Accueil';
import Candidature from './Candidature';
// import Offres from './Offres';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/candidature" element={<Candidature />} />
        {/* <Route path="/offres" element={<Offres />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
