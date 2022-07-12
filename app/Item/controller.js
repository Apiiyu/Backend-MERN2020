module.exports = {
  viewItem: (request, response) => {
    response.render('admin/item/v_item', {
      title: 'Items',
      url: '/items'
    })
  }
}