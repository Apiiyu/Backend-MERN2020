const mongoose = require('mongoose')

let schemaActivities = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Feature Name is required!'],
  },
  type: {
    type: String,
    require: [true, 'Type is required!']
  },
  isPopular: {
    type: Boolean,
    default: null
  },
  imageUrl: {
    type: String,
  },
  items: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'items'
  }
},{
  timestamps: true
})

module.exports = mongoose.model('activities', schemaActivities)