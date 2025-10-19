console.log('>> RUTAS CARGADAS:', __filename);
// Archivo Movie.routes.js dentro de la carpeta routes
const express = require('express');
const mongoose = require('mongoose');
const Movie = require('../models/Movie');
const router = express.Router();

// Diagnóstico
router.get('/ping', (req, res) => res.send('pong'));
router.post('/echo', (req, res) => res.json({ received: req.body }));

//    Crear un endpoint get que devuelva todas las películas.

router.get('/list/', async (req, res, next) => {
	try {
		const movies = await Movie.find();
		return res.status(200).json(movies)
	} catch (error) {
		return next(error)
	}
});

//    Crear un endpoint get que devuelva una película según su _id
 router.get('/id/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const movie = await Movie.findById(id);
		if (movie) {
			return res.status(200).json(movie);
		} else {
			return res.status(404).json('Not movie found by this id');
		}
	} catch (err) {
		return res.status(500).json(err);
	}
});

//    Crear un endpoint get que devuelva un valor por su titulo.
router.get('/title/:title', async (req, res) => {
	const {title} = req.params;

	try {
		const MovieByTitle = await Movie.find({ title: title });
		return res.status(200).json(MovieByTitle);
	} catch (err) {
		return res.status(500).json(err);
	}
});

//    Crear un endpoint get que devuelva los documentos según su género.


 router.get('/genre/:genre', async (req, res) => {
	const {genre} = req.params;

	try {
		const MovieByGenre = await Movie.find({ genre: genre });
		return res.status(200).json(MovieByGenre);
	} catch (err) {
		return res.status(500).json(err);
	}
});

//    Crear un endpoint get que devuelva las películas que se han estrenado a partir de 2010.

// Cualquier fecha por año

 router.get('/date/:year', async (req, res) => {
	const {year} = req.params;

	try {
		const MovieByDate = await Movie.find({ year: { $gte:year } });
		return res.status(200).json(MovieByDate);
	} catch (err) {
		return res.status(500).json(err);
	}
});

// Fecha 2010

 router.get('/date/', async (req, res) => {

	try {
		const MovieByDate = await Movie.find({ year: { $gte:2010 } });
		return res.status(200).json(MovieByDate);
	} catch (err) {
		return res.status(500).json(err);
	}
});

// Crear

router.post('/create/', async (req, res, next) => {
    console.log('BODY >>', req.body);
	try {
      // Crearemos una instancia de Movies con los datos enviados
      const newMovie = new Movie({
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        genre: req.body.genre
      });
  
      // Guardamos la pelicula en la DB
      const createdMovie = await newMovie.save();
      return res.status(201).json(createdMovie);
    } catch (error) {
          // Lanzamos la función next con el error para que lo gestione Express
      next(error);
    }
  });

  // Modificar una película

router.put('/edit/id/:id', async (req, res, next) => {
    try {
        const { id } = req.params //Recuperamos el id de la url
        const movieModify = new Movie(req.body) //instanciamos un nuevo Movie con la información del body
        movieModify._id = id //añadimos la propiedad _id a la pelicula creada
        const movieUpdated = await Movie.findByIdAndUpdate(id , movieModify)
        return res.status(200).json(movieUpdated)//Esta pelicula que devolvemos es la anterior a su modificación
    } catch (error) {
        return next(error)
    }
});

  // Eliminar por ID

  router.delete('/id/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        // No será necesaria asignar el resultado a una variable ya que vamos a eliminarlo
        await Movie.findByIdAndDelete(id);
        return res.status(200).json('Movie deleted!');
    } catch (error) {
        return next(error);
    }
});




module.exports = router;