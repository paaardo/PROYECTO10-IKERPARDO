import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Registro from './components/Registro';
import ListaEvento from './components/ListaEvento';
import DetallesEvento from './components/DetallesEvento';
import CrearEvento from './components/CrearEvento';
import Navbar from './components/Navbar';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
      console.log('Token actualizado:', storedToken);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ListaEvento />} />
        <Route path="/eventos/:id" element={<DetallesEvento />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
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
