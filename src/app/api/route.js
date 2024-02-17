const axios = require('axios');
const { Client } = require('pg');

const API_URL = '/api/route';

// Configuración del cliente de PostgreSQL
const client = new Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432, // El puerto por defecto de PostgreSQL es 5432
});

// Conexión al cliente de PostgreSQL
client.connect();

// Función para manejar el envío del formulario
async function handleFormSubmit(req, res) {
  try {
    const data = req.body;

    // Validación de datos del formulario
    if (!isValidFormData(data)) {
      throw new Error('Datos del formulario no válidos.');
    }

    // Ejemplo de consulta SQL para insertar datos en la base de datos
    const query = 'INSERT INTO tabla (campo1, campo2, campo3) VALUES ($1, $2, $3)';
    const values = [data.campo1, data.campo2, data.campo3];
    await client.query(query, values);

    // Envío de datos a la API utilizando Axios
    const axiosResponse = await axios.post(API_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        // Agregar cualquier header adicional necesario, como la autenticación
      },
    });

    if (axiosResponse.status === 200) {
      res.status(200).send({ message: 'Formulario enviado correctamente.' });
    } else {
      throw new Error('Error al enviar el formulario.');
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error.message);
    res.status(500).send({ error: 'Error interno del servidor.' });
  }
}

// Función para validar los datos del formulario
function isValidFormData(data) {
  // Implementar lógica de validación de datos del formulario según tus requisitos
  // Retorna true si los datos son válidos, de lo contrario retorna false
  return true;
}

// Función para manejar las solicitudes HTTP
module.exports = async function handler(req, res) {
  if (req.method === 'POST' || req.method === 'GET') {
    // Aquí maneja la lógica para los métodos POST y GET
    if (req.method === 'POST') {
      return await handleFormSubmit(req, res);
    } else {
      // Aquí podrías enviar el formulario HTML al cliente
      res.status(200).send({ message: 'Formulario HTML enviado.' });
    }
  } else {
    res.status(405).send({ error: 'Método no permitido.' });
  }
}
