const mongoose = require('mongoose')

let schemaMember = mongoose.Schema({
  email: {
    type: String,
    require: [true, 'Email is required!']
  },
  firstName: {
    type: String,
    require: [true, 'First Name is required!'],
  },
  lastName: {
    type: String,
    require: [true, 'Last Name is required!'],
  },
  phoneNumber: {
    type: String,
    require: [true, 'Phone Number is required!'],
    minLength: [10, 'Phone Number is 10 - 225 Character'],
    maxLength: [13, 'Phone Number is 3 - 225 Character'],
  },
  role: {
    type: String,
    enum: ['Admin', 'User'],
    default: 'User'
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  avatar: {
    type: String,
  },
}, {
  timestamps: true
})

schemaMember.path('email').validate(async (value) => {
  try {
    const count = await mongoose.model('members').countDocuments({email: value})
    return !count
  } catch (error) {
    throw error
  }
}, attrribute => `${attrribute.value} has already registered!`)


module.exports = mongoose.model('members', schemaMember)