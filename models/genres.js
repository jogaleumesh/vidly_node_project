import mongoose from 'mongoose';
import Joi from 'joi';

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength:5,
    maxLength:50
  }
})

const Genre = mongoose.model('Genre', genreSchema);

function validateGenres(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  })

 return schema.validate(genre);
}


export { Genre, genreSchema,  validateGenres };