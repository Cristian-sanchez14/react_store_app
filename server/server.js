const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const port = process.env.PORT
const Stripe = require('stripe')(
  'sk_test_51MYvhVJdzcHxDUvhVDHjs4KSy5bo1wQD3wZ4Y8yygUFOqK7IcYLsU98CMmy9RxTexzV70JsC85zlxQHOR0fk3ToU00LQ6JTufE'
)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/pay', async (req, res) => {
  console.log(req.body.token)
  await Stripe.charges.create({
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  })
})

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`)
})
