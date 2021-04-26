import mongoose from 'mongoose';
import Joi from 'joi';
import config from 'config'
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength:5,
    maxLength:50
  },
  email:{
    type: 'string',
    unique: true,
    required:true,
    minLength:5,
    maxLength:255
  },
  password: {
    type: String,
    required: true,
    minLength:5,
    maxLength:1024
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, isAdmin:this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);


function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  });

  return schema.validate(user);
}

export { User ,  validateUser };