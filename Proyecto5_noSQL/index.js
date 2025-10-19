const express = require('express');
const {connect} = require('./utils/db');
const movieRoutes = require('./routes/movie.routes');

connect(); // Llamamos a la función connect que conecta con MongoDB
const PORT = 3000;
const server = express();
//const router = express.Router();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use((req, res, next) => {
  console.log(`> ${req.method} ${req.url} | CT:${req.headers['content-type']}`);
  next();
});
server.use('/movies', movieRoutes);

//Manejador de rutas no especificadas
server.use((req, res, next) => {
	const error = new Error('Route not found'); 
	error.status = 404;
	next(error); 
  });

//Manejador de errores
server.use((error, req, res, next) => {
	return res.status(error.status || 500).json(error.message || 'Unexpected error');
});

server.listen(PORT, () => {
  console.log(`Server running in <http://localhost>:${PORT}`);
});

