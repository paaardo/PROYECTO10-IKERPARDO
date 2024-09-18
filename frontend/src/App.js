import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Registro from './components/Registro';
import ListaEvento from './components/ListaEvento';
import DetallesEvento from './components/DetallesEvento';
import CrearEvento from './components/CrearEvento';
import Navbar from './components/Navbar';

function App() {

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('token');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const token = localStorage.getItem('token');

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ListaEvento />} />
        <Route path="/eventos/:id" element={<DetallesEvento />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route 
          path="/crear-evento" 
          element={token ? <CrearEvento /> : <Navigate to="/login" />} 
        />
        <Route 
          path="*" 
          element={token ? <Navigate to="/" /> : <Navigate to="/login" />} 
        />
      </Routes>
    </>
  );
}

export default App;
