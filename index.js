
const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./db/config');
const cors = require('cors');

console.log(process.env);


//Crear el servidor de express
const app = express();


//Base de datos
dbConnection();


//Configuración de CORS
app.use(cors());


//Directorio Público
app.use( express.static('public'));


//Lectura y parseo del body
app.use( express.json() );


//Rutas
//TODO: auth // Crear, login, new
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.get('*', ( req, res ) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'));
})


//Escuchar peticiones
app.listen( process.env.PORT, () => {

  console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});