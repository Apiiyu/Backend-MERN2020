const mongoose = require('mongoose')
let schemaImages = mongoose.Schema({
  imageUrl: {
    type: String,
    require: [true, 'Image Url is required!'],
  },

},{
  timestamps: true
})

module.exports = mongoose.model('images', schemaImages)