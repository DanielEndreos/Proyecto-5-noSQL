// Archivo movie.seed.js
const mongoose = require('mongoose');

// Importamos el modelo Movie en este nuevo archivo.
const Movie = require('../models/Movie');

const movies = [
  {
    title: 'The Matrix',
    director: 'Hermanas Wachowski',
    year: 1999,
    genre: 'Acción',
  },
  {
    title: 'The Matrix Reloaded',
    director: 'Hermanas Wachowski',
    year: 2003,
    genre: 'Acción',
  },
  {
    title: 'Buscando a Nemo',
    director: 'Andrew Stanton',
    year: 2003,
    genre: 'Animación',
  },
  {
    title: 'Buscando a Dory',
    director: 'Andrew Stanton',
    year: 2016,
    genre: 'Animación',
  },
  {
    title: 'Interestelar',
    director: 'Christopher Nolan',
    year: 2014,
    genre: 'Ciencia ficción',
  },
  {
    title: '50 primeras citas',
    director: 'Peter Segal',
    year: 2004,
    genre: 'Comedia romántica',
  },
];

const movieDocuments = movies.map(movie => new Movie(movie));

mongoose
  .connect('mongodb://localhost:27017/movies', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
		// Utilizando Movie.find() obtendremos un array con todos los personajes de la db
    const allMovies = await Movie.find();
		
		// Si existen peliculas previamente, dropearemos la colección
    if (allMovies.length) {
      await Movie.collection.drop(); //La función drop borra la colección
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
		// Una vez vaciada la db de las peliculas, usaremos el array movieDocuments
		// para llenar nuestra base de datos con todas las peliculas.
		await Movie.insertMany(movieDocuments);
	})
  .catch((err) => console.log(`Error creating data: ${err}`))
	// Por último nos desconectaremos de la DB.
  .finally(() => mongoose.disconnect());