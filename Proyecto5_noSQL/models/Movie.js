// Archivo movie.js dentro de la carpeta models
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Creamos el esquema de la película
const moviesSchema = new Schema(
  {
    title: { type: String, required: true },//La propiedad required hace que el campo sea obligatorio
    director: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
  },
  {
    // Esta propiedad servirá para guardar las fechas de creación y actualización de los documentos
    timestamps: true,
  }
);

// Creamos y exportamos el modelo Movie
const Movie = mongoose.model('Movie', moviesSchema);
module.exports = Movie;