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
  payments: {
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
    status: {
      type: String,
      enum: ['Failed', 'Process', 'Success'],
      default: 'Process'
    },
  },
  invoice: {
    type: Number,
  },
  total: {
    type: Number,
  },
  items: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'
    },
    title: {
      type: String,
    },
    price: {
      type: Number,
      require: [true, 'Price Items is required!']
    },
    duration: {
      type: Number,
      require: [true, 'Duration is required!']
    }
  },
  members: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member'
  },
  banks: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bank'
  }
},{
  timestamps: true
})

module.exports = mongoose.model('Booking', schemaBooking)