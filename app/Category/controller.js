const Category = require('./model')

module.exports = {
  viewCategory: async (request, response) => {
    try {
      const data = await Category.find()
      const message = request.flash('message')
      const status = request.flash('status')
      const alert = {message, status}

      response.render('admin/category/v_category', {
        title: 'Categories',
        url: '/categories',
        data,
        alert
      })
    } catch (error) {
      request.flash('message', 'Failed create new categories!')
      request.flash('status', 'danger')
      response.redirect('/categories')
    }
  },
  createData: async (request, response) => {
    try {
      const { name } = request.body 
      
      await Category.create({ name })

      request.flash('message', 'Successfully create new categories!')
      request.flash('status', 'success')
      response.redirect('/categories')
    } catch (error) {
      request.flash('message', 'Failed create new categories!')
      request.flash('status', 'danger')
      response.redirect('/categories')
    }
  },
  updateData: async (request, response) => {
    try {
      const { id, name } = request.body
  
      await Category.findByIdAndUpdate(id, { name })
      request.flash('message', 'Successfully update data categories!')
      request.flash('status', 'success')
      response.redirect('/categories')
    } catch (error) {
      request.flash('message', 'Failed update data categories!')
      request.flash('status', 'danger')
      response.redirect('/categories')
    }
  },
  deleteData: async (request, response) => {
    try {
      const { id } = request.params
  
      await Category.findByIdAndRemove(id)
      request.flash('message', 'Successfully delete data categories!')
      request.flash('status', 'success')
      response.redirect('/categories')
    } catch (error) {
      request.flash('message', 'Failed delete data categories!')
      request.flash('status', 'danger')
      response.redirect('/categories')
    }
  }
}
