// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Registro from './components/Registro';
import ListaEvento from './components/ListaEvento';
import DetallesEvento from './components/DetallesEvento';
import SubirArchivo from './components/SubirArchivo';
import CrearEvento from './components/CrearEvento';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ListaEvento />} />
        <Route path="/eventos/:id" element={<DetallesEvento />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/upload" element={<SubirArchivo />} />
        <Route path="/crear-evento" element={<CrearEvento />} />
      </Routes>
    </Router>
  );
}

export default App;
