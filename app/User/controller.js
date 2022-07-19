const User = require('./model')
const bcrypt = require('bcryptjs')

module.exports = {
  viewLogin: async (request, response) => {
    try {
      const message = request.flash('message')
      const status = request.flash('status')
      const alert = { message, status }

      if (request.session.user === null || request.session.user === undefined) {
        response.render('login', {
          alert,
          title: 'Staycation | Sign In'
        })
      } else {
        response.redirect('/dashboard')
      }
    } catch (error) {
      console.error(error)
    }
  },
  signIn: async (request, response) => {
    try {
      const { username, password } = request.body 
      const user = await User.findOne({ username })

      if (user) {
        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
          request.flash('message', 'Your password is invalid!')
          request.flash('status', 'danger')
          response.redirect('/auth/login')
        }

        request.session.user = {
          id: user._id,
          username: user.username,
          role: user.role
        }

        console.log(request.session)
        response.redirect('/dashboard')
      }

      request.flash('message', 'Your username is invalid!')
      request.flash('status', 'danger')
      response.redirect('/auth/login')
    } catch (error) {
      request.flash('message', 'Error process login!')
      request.flash('status', 'danger')
      response.redirect('/auth/login')
    }
  },

  signOut: (request, response) => {
    request.session.destroy()
    response.redirect('/')
  }
}