const mongoose = require('mongoose')

let schemaBank = mongoose.Schema({
  bankName: {
    type: String,
    require: [true, 'Bank Name is required!'],
  },
  accountNumber: {
    type: Number,
    require: [true, 'Account Number is required!']
  },
  name: {
    type: String,
    require: [true, 'Name is required!']
  },
  imageUrl: {
    type: String,
    require: [true, 'Bank Image is required!']
  }
},{
  timestamps: true
})

module.exports = mongoose.model('Bank', schemaBank)