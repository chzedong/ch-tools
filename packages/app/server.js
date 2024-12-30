const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/api', (req, res) => {
  res.send({ message: 'Hello World' })
})

app.listen(1337, () => {
  console.log('Server is running on port 3000')
})
