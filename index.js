const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = 3000;

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para obtener 10 usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=10&nat=us,gb,es,mx');
    const data = await response.json();

    const usuarios = data.results.map(user => ({
      nombre: `${user.name.first} ${user.name.last}`,
      genero: user.gender,
      ubicacion: `${user.location.city}, ${user.location.country}`,
      correo: user.email,
      fechaNacimiento: user.dob.date.split('T')[0],
      fotografia: user.picture.medium
    }));

    res.json(usuarios);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});