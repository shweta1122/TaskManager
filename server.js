const express = require('express')
const { sequelize } = require('./db')
const server = express()
const port = process.env.PORT || 2121
const todos = require('./todos')
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use('/todos', todos)

server.use(express.static('public'))

sequelize.sync()
  .then(() => {
    console.log(port);

    server.listen(port)
  })
  .catch((err) => {
    console.error(err)
  })

