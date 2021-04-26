import express from 'express';
import { Genre } from '../models/genres.js';
import { Movie, validateMovie } from '../models/movies.js';


const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.send(movies);
});


router.post('/', async (req, res) => {
  const { error } = validateMovie(req.body);
  if(error) return res.status(400).send(error.detail[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if(!genre) return res.status(400).send('The genre with the given ID was not found.');

  const movie = new Movie({
    title: req.body.title,
    genre:{
      _id: genre._id,
      name: genre.name
    },
    numberInStock:req.body.numberInStock,
    dailyRentalRate:req.body.dailyRentalRate
  });

  await movie.save();
  res.send(movie);
});

export default router;