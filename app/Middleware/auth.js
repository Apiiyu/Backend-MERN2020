module.exports = {
  isLoginAdmin: (request, response, next) => {
    if (request.session.user === null || request.session.user === undefined) {
      request.flash('message', 'Sorry, your session is expired!')
      request.flash('status', 'danger')
      response.redirect('/')
    } else {
      next()
    }
  }
}