const mongoose = require('mongoose')
const { UrlDb } = require('../env')

mongoose.connect(UrlDb, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
})

const connection = mongoose.connection

module.exports = connection