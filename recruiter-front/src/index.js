/*
 *   Copyright (c) 2024 
 *   All rights reserved.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import styles from './index.module.css';
import axios from 'axios';
import App from './App';
import Connexion from './Connexion';
import Dashboard from './Dashboard'; 
import Accueil from './Accueil';
import Candidature from './Candidature';
import Offres from './Offres';
import View from './View';
import Calendar from './Calendar';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// Configure axios


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<App />} />
        <Route path="/candidature" element={<Candidature />} />
        
        <Route path="/offres" element={<Offres />} /> 
        <Route path="/view" element={<View />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


