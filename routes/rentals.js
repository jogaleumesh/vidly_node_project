import express from 'express';
import mongoose from 'mongoose';
import Fawn from 'fawn';

import { Rental, validateRental } from '../models/rentals.js';
import { Customer } from '../models/customers.js';
import { Movie } from '../models/movies.js';

const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res)=>{
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.post('/', async (req, res)=>{
  const { error } = validateRental(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if(!customer) return res.status(404).send('The customer with the given ID was not found.');

  const movie = await Movie.findById(req.body.movieId);
  if(!movie) return res.status(404).send('The movie with the given ID was not found');

  if(movie.numberInStock == 0) return res.status(400).send('Movie not in stock');

  let rental = new Rental({
    customer:{
      _id: customer._id,
      name:customer.name,
      phone:customer.phone,
    },
    movie: {
      _id:movie._id,
      title: movie.title,
      dailyRentalRate:movie.dailyRentalRate,
    }
  });

 try{
    new Fawn.Task()
    .save('rentals', rental)
    .update('movies', { _id: movie._id },{
      $inc: { numberInStock: -1 }
    })
    .run();

    res.send(rental);
 } catch (ex) {
    return res.status(500).send('Something failed');
 }
});

export default router;