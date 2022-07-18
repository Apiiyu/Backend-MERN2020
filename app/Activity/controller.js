const Activity = require('./model')
const Item = require('../Item/model')
const fs = require('fs')
const path = require('path')
const config = require('../../config/env')

module.exports = {
  viewActivity: async (request, response) => {
    const { id } = request.params
  
    try {
      const message = request.flash('message')
      const status = request.flash('status')
      const alert = {message, status}
      const data = await Activity.find().populate('items')

      response.render('admin/item/detail/v_detail', {
        title: 'Detail Items',
        url: '/items',
        alert,
        data,
        itemsId: id,
      })
    } catch (error) {
      request.flash('message', 'Failed get data!')
      request.flash('status', 'danger')
      response.redirect(`/items/detail/${id}`)
    }
  },

  createData: async (request, response) => {
    try {
      const { name, type, items } = request.body
      const isPopular = request.body.isPopular === 'on' ? true : false
      const dataItems = await Item.findById(items)

      if (request.file) {
        let tmp_path = request.file.path
        let originalExt = request.file.originalname.split('.')[request.file.originalname.split('.').length - 1]
        let filename = request.file.filename + '.' + originalExt
        let target_path = path.resolve(config.rootPath, `public/assets/uploads/activities/${filename}`)
      
        const src = fs.createReadStream(tmp_path)
        const destination = fs.createWriteStream(target_path)

        src.pipe(destination)
        src.on('end', async () => {
          let payload = {
            name,
            type,
            isPopular,
            imageUrl: filename,
            items
          }

          const activities = await Activity.create(payload)
          dataItems.activities.push({ _id: activities._id})
          dataItems.save()

          request.flash('message', 'Successfully create new data activities!')
          request.flash('status', 'success')
          response.redirect(`/items/detail/${items}`)
        })
      } else {
        let payload = {
          name,
          qty,
          items
        }

        const activities = await Activity.create(payload)
        dataItems.activities.push({ _id: activities._id })
        request.flash('message', 'Successfully create new data items!')
        request.flash('status', 'success')
        response.redirect(`/items/detail/${items}`)
      }

    } catch (error) {
      request.flash('message', 'Failed create data!')
      request.flash('status', 'danger')
      response.redirect('/items/detail')
    }
  },

  updateData: async (request, response) => {
    const { id, items } = request.body
    try {
      const { name, type } = request.body
      const isPopular = request.body.isPopular === 'on' ? true : false
      const activities = await Activity.findById(id)
      
      if (request.file) {
        let tmp_path = request.file.path
        let originalExt = request.file.originalname.split('.')[request.file.originalname.split('.').length - 1]
        let filename = request.file.filename + '.' + originalExt
        let target_path = path.resolve(config.rootPath, `public/assets/uploads/activities/${filename}`)
      
        const src = fs.createReadStream(tmp_path)
        const destination = fs.createWriteStream(target_path)

        src.pipe(destination)
        src.on('end', async () => {
          const currentImage = `${config.rootPath}/public/assets/uploads/activities/${activities.imageUrl}`
          if (currentImage) fs.unlinkSync(currentImage)

          let payload = {
            name,
            type,
            imageUrl: filename,
            items,
            isPopular
          }

          await Activity.findByIdAndUpdate(id, payload)

          request.flash('message', 'Successfully update data activities!')
          request.flash('status', 'success')
          response.redirect(`/items/detail/${items}`)
        })
      } else {
        let payload = {
          name,
          type,
          items,
          isPopular
        }

        await Activity.findByIdAndUpdate(id, payload)
        request.flash('message', 'Successfully update data activities!')
        request.flash('status', 'success')
        response.redirect(`/items/detail/${items}`)
      }
    } catch (error) {
      request.flash('message', 'Failed delete data!')
      request.flash('status', 'danger')
      response.redirect(`/items/detail/${items}`)
    }
  },

  deleteData: async (request, response) => {
    const { id } = request.params
    try {
      const activities = await Activity.findById(id)
      const dataItem = await Item.findById(activities.items).populate('activities')
      const listActivities = dataItem.activities
      console.log({listActivities})

      
      listActivities.map(async (item, index) => {
        const currentImage = `${config.rootPath}/public/assets/uploads/activities/${item.imageUrl}`
        if (item.imageUrl) {
          fs.unlinkSync(currentImage)
        }

        if(item._id.toString() === activities._id.toString()) {
          console.log('masuk sini')
          listActivities.splice(index, 1)
          await dataItem.save()
          await Activity.findByIdAndDelete(id)
        }
      })


      request.flash('message', 'Successfully delete data activities!')
      request.flash('status', 'success')
      response.redirect(`/items`)
    } catch (error) {
      request.flash('message', 'Failed delete data!')
      request.flash('status', 'danger')
      response.redirect(`/items/detail/${id}`)
    }
  }
}