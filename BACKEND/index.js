const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');  // Añadir esta línea para manejar rutas de archivos

const usuariosRutas = require('./routes/usuarios');
const eventosRutas = require('./routes/eventos');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Configurar el middleware para servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api/usuarios', usuariosRutas);
app.use('/api/eventos', eventosRutas);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB', err));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
