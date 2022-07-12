const mongoose = require('mongoose')

let schemaBooking = mongoose.Schema({
  startDate: {
    type: Date,
    require: [true, 'Start Date Booking is required!'],
  },
  endDate: {
    type: Date,
    require: [true, 'End Date Booking is required!']
  },
  proofPayment: {
    type: String,
    require: [true, 'Proof Payment is required!']
  },
  bankFrom: {
    type: String,
    require: [true, 'Bank From is required!']
  },
  bankHolder: {
    type: String,
    require: [true, 'Description is required!']
  },
  imageUrl: {
    type: String,
    default: false
  },
  status: {
    type: Boolean,
    default: false
  },
  items: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'items'
    },
    price: {
      type: Number,
      require: [true, 'Price Items is required!']
    },
    night: {
      type: Number,
      require: [true, 'Long Night is required!']
    }
  }],
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'members'
  }],
  banks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'banks'
  }]
},{
  timestamps: true
})

module.exports = mongoose.model('bookings', schemaBooking)