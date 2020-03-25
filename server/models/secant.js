const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  id: Number,
  X0: String,
  X1: String,
  Function: String
})

const ProductModel = mongoose.model('secant', productSchema)

module.exports = ProductModel