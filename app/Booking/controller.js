module.exports = {
  viewBooking: (request, response) => {
    response.render('admin/booking/v_booking', {
      title: 'Booking',
      url: '/booking'
    })
  }
}