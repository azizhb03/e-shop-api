const mongoose = require('mongoose')
const { Schema } = mongoose;

const UseProduct = new Schema({
  name: {
    type: String,
    required: true,
  }, 
  category: {
    type: String,
    required: true,
  },
  description : {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
  },
  old_price: {
    type: Number,
  }
});


const Productt = mongoose.model("Productt", UseProduct);


module.exports = Productt;
