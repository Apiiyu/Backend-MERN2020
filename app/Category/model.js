const mongoose = require('mongoose')
let schemaCategories = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Category name is required!'],
  },

},{
  timestamps: true
})

module.exports = mongoose.model('categories', schemaCategories);