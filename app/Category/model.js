const mongoose = require('mongoose')
let schemaCategories = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Category name is required!'],
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }]
},{
  timestamps: true
})

module.exports = mongoose.model('Category', schemaCategories);