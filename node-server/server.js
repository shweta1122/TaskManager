const express = require('express')
const { sequelize } = require('./db')
const server = express()

const todos = require('./todos')
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use('/todos', todos)

server.use(express.static('public'))

sequelize.sync()
  .then(() => {
    server.listen(2121)
  })
  .catch((err) => {
    console.error(err)
  })
//okieee
// server.listen(2121)

// server.use('/api', require('./routes,api').route)
