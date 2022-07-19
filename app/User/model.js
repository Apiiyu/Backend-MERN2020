const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const schemaUser = new mongoose.Schema({
  username: {
    type: String,
    require: [true, 'Username is required!']
  },
  password: {
    type: String,
    require: [true, 'Password is required'],
    minLength: [5, 'Password at least must contain 5 character']
  },
  role: {
    type: String,
    enum: ['Admin', 'Users'],
    default: 'Users'
  }
}, {
  timestamps: true
})

schemaUser.path('username').validate(async (value) => {
  try {
    const count = await mongoose.model('Users').countDocuments({username: value})
    return !count
  } catch (error) {
    throw error
  }
}, attrribute => `${attrribute.value} has already registered!`)

schemaUser.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
  next()
})

module.exports = mongoose.model('Users', schemaUser)