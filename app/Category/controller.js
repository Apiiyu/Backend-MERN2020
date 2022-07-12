const Category = require('./model')

module.exports = {
  viewCategory: async (request, response) => {
    const data = await Category.find()

    response.render('admin/category/v_category', {
      title: 'Categories',
      url: '/categories',
      data,
    })
  },
  createData: async (request, response) => {
    const { name } = request.body 
    
    await Category.create({ name })
    response.redirect('/categories')
  },
  updateData: async (request, response) => {
    const { id, name } = request.body

    await Category.findByIdAndUpdate(id, { name })
    response.redirect('/categories')
  },
  deleteData: async (request, response) => {
    const { id } = request.params

    await Category.findByIdAndRemove(id)
    response.redirect('/categories')
  }
}
