const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/product')
const Onepoint = require('./models/onepoint')
const Secant = require('./models/secant')
const Newton = require('./models/newton')


app.use(express.json())
mongoose.connect('mongodb+srv://ton:123@project-ql2aa.mongodb.net/Sample?retryWrites=true&w=majority', { useNewUrlParser: true })
const connection = mongoose.connection;
// สร้าง database schema
/*const Cat = mongoose.model('Cat', { name: String })

// สร้าง instance จาก model
const kitty = new Cat({ name: 'JavaScript' })

// save ลง database (return เป็น Promise)
kitty.save().then(() => console.log('meow'))*/

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.get('/products', async (req, res) => {
  const products = await Product.findOne({ id: Math.floor(Math.random() * 2 + 1) })
  res.json(products)
})
app.post('/Newton', async (req, res) => {
  const payload = req.body
  const product = new Newton(payload)
  await product.save()
  res.status(201).end()
})

app.get('/FalsePosition', async (req, res) => {
  const products = await Product.findOne({ id: Math.floor(Math.random() * 2 + 1) })
  res.json(products)
})

app.get('/onepoint', async (req, res) => {
  const products = await Onepoint.findOne({ id: Math.floor(Math.random() * 2 + 1) })
  res.json(products)
})

app.get('/Newton', async (req, res) => {
  const products = await Newton.findOne({ id: Math.floor(Math.random() * 2 + 1) })
  res.json(products)
})


app.get('/Secant', async (req, res) => {
  const products = await Secant.findOne({ id: Math.floor(Math.random() * 2 + 1) })
  res.json(products)
})


app.listen(9000, () => {
  console.log('Application is running on port 9000')
})