const mongoose = require('mongoose')

let schemaFeature = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Feature Name is required!'],
  },
  qty: {
    type: Number,
    require: [true, 'Feature Quantity is required!']
  },
  imageUrl: {
    type: String,
    require: [true, 'Country is required!']
  },
},{
  timestamps: true
})

module.exports = mongoose.model('features', schemaFeature)