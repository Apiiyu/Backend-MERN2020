module.exports = {
  viewDashboard: (request, response) => {
    response.render('admin/dashboard/v_dashboard', {
      title: 'Dashboard',
      url: '/dashboard'
    })
  }
}