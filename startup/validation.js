import Joi from 'joi';
import joiObject from 'joi-objectid';

export default function() {
  Joi.objectId = joiObject(Joi);
}