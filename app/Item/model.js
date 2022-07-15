const mongoose = require('mongoose')

let schemaItems = mongoose.Schema({
  title: {
    type: String,
    require: [true, 'Title is required!'],
  },
  price: {
    type: Number,
    require: [true, 'Price is required!']
  },
  country: {
    type: String,
    require: [true, 'Country is required!']
  },
  city: {
    type: String,
    require: [true, 'City is required!']
  },
  description: {
    type: String,
    require: [true, 'Description is required!']
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  categories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories'
  },
  images: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'images'
  }],
  features: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'features'
  }],
  activities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'activities'
  }]
},{
  timestamps: true
})

module.exports = mongoose.model('items', schemaItems)