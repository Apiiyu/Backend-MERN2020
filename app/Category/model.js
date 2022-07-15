const mongoose = require('mongoose')
let schemaCategories = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Category name is required!'],
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'items'
  }]
},{
  timestamps: true
})

module.exports = mongoose.model('categories', schemaCategories);