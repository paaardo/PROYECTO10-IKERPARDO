import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Registro from './components/Registro';
import ListaEvento from './components/ListaEvento';
import DetallesEvento from './components/DetallesEvento';
import SubirArchivo from './components/SubirArchivo';
import CrearEvento from './components/CrearEvento';
import Navbar from './components/Navbar';


function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ListaEvento />} />
        <Route path="/eventos/:id" element={<DetallesEvento />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/upload" element={token ? <SubirArchivo /> : <Navigate to="/login" />} />
        <Route path="/crear-evento" element={token ? <CrearEvento /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
