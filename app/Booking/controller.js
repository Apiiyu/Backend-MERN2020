const Booking = require('./model')
const Member = require('../Member/model')

module.exports = {
  viewBooking: async (request, response) => {
    try {
      const message = request.flash('message')
      const status = request.flash('status')
      const alert = {message, status}
      // const member = await Member.find()
      const data = await Booking.find().populate('members').populate('banks').populate('items._id')

      response.render('admin/booking/v_booking', {
        title: 'Booking',
        url: '/booking',
        alert,
        data,
      })
    } catch (error) {
      request.flash('message', 'Failed get data!')
      request.flash('status', 'danger')
      response.redirect(`/booking`)
    }
  },

  viewDetail: async (request, response) => {
    try {
      const { id } = request.params
      const data = await Booking.findById(id).populate('members').populate('banks').populate('items._id')

      response.render('admin/booking/v_detail', {
        title: 'Detail Booking',
        url: '/booking',
        data,
      })
    } catch (error) {
      request.flash('message', 'Failed get data!')
      request.flash('status', 'danger')
      response.redirect(`/booking`)
    }
  },

  changeStatus: async (request, response) => {
    try {
      const { id } = request.params
      const { status } = request.body
      let booking = await Booking.findById(id)

      booking.payments.status = status
      await booking.save()
      request.flash('message', 'Success change status payments!')
      request.flash('status', 'success')
      response.redirect(`/booking`)
    } catch (error) {
      request.flash('message', 'Failed change status!')
      request.flash('status', 'danger')
      response.redirect(`/booking`)
    }
  }
}