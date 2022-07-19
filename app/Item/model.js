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
  sumBooking: {
    type: Number,
    require: [true, 'Sum Booking is required!']
  },
  unit: {
    type: String,
    require: [true, 'Unit is required!']
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
    ref: 'Category'
  },
  images: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  }],
  features: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feature'
  }],
  activities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity'
  }]
},{
  timestamps: true
})

module.exports = mongoose.model('Item', schemaItems)