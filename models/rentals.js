import mongoose from 'mongoose';
import Joi from "joi";
import JoiObjectId from "joi-objectid";


const objectId = JoiObjectId(Joi);
const Rental = mongoose.model('Rental', mongoose.Schema({
  customer:{
    type: new mongoose.Schema({
      name:{
        type:String,
        required:true,
        minLength:5,
        maxLength:50
      },
      isGold:{
        type:String,
        required:true,
      },
      phone:{
        type:String,
        required:true,
        minLength:5,
        maxLength:50
      }
    }),
    required:true
  },
  movie:{
    type: new mongoose.Schema({
      title:{
        type: String,
        required: true,
        trim: true,
        minlength:5,
        maxlength:255
      },
      dailyRentalRate:{
        type: Number,
        required: true,
        min:0,
        max:255
      }
    }),
    required:true
  },
  dateOut:{
    type:Date,
    required:true,
    default: Date.now
  },
  dateReturned:{
    type: Date
  },
  rentalFee:{
    type: Number,
    min:0
  }
}));

function validateRental(rentral) {
  const schema = Joi.object({
    customerId: objectId().required(),
    movieId: objectId().required(),
  })

  return schema.validate(rentral);
}

export { Rental , validateRental };