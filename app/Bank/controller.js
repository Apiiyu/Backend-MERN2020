module.exports = {
  viewBank: (request, response) => {
    response.render('admin/bank/v_bank', {
      title: 'Bank',
      url: '/bank'
    })
  }
}