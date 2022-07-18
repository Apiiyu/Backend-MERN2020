const Feature = require('./model')
const Item = require('../Item/model')
const fs = require('fs')
const path = require('path')
const config = require('../../config/env')

module.exports = {
  viewFeature: async (request, response) => {
    const { id } = request.params
  
    try {
      const message = request.flash('message')
      const status = request.flash('status')
      const alert = {message, status}
      const data = await Feature.find().populate('items')

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
      response.redirect(`/items/features/${id}`)
    }
  },

  createData: async (request, response) => {
    try {
      const { name, qty, items } = request.body
      const dataItems = await Item.findById(items)

      if (request.file) {
        let tmp_path = request.file.path
        let originalExt = request.file.originalname.split('.')[request.file.originalname.split('.').length - 1]
        let filename = request.file.filename + '.' + originalExt
        let target_path = path.resolve(config.rootPath, `public/assets/uploads/features/${filename}`)
      
        const src = fs.createReadStream(tmp_path)
        const destination = fs.createWriteStream(target_path)

        src.pipe(destination)
        src.on('end', async () => {
          let payload = {
            name,
            qty,
            imageUrl: filename,
            items
          }

          const feature = await Feature.create(payload)
          dataItems.features.push({ _id: feature._id})
          dataItems.save()
          console.log(dataItems, 'feature')

          request.flash('message', 'Successfully create new data items!')
          request.flash('status', 'success')
          response.redirect(`/items/features/${items}`)
        })
      } else {
        let payload = {
          name,
          qty,
          items
        }

        const feature = await Feature.create(payload)
        dataItems.features.push({ _id: feature._id })
        request.flash('message', 'Successfully create new data items!')
        request.flash('status', 'success')
        response.redirect(`/items`)
      }

    } catch (error) {
      request.flash('message', 'Failed create data!')
      request.flash('status', 'danger')
      response.redirect('/items/detail')
    }
  },

  updateData: async (request, response) => {
    const { id } = request.body
    try {
      const { name, qty, items } = request.body
      const features = await Feature.findById(id)
      console.log(features, 'feature')
      
      if (request.file) {
        let tmp_path = request.file.path
        let originalExt = request.file.originalname.split('.')[request.file.originalname.split('.').length - 1]
        let filename = request.file.filename + '.' + originalExt
        let target_path = path.resolve(config.rootPath, `public/assets/uploads/features/${filename}`)
      
        const src = fs.createReadStream(tmp_path)
        const destination = fs.createWriteStream(target_path)

        src.pipe(destination)
        src.on('end', async () => {
          const currentImage = `${config.rootPath}/public/assets/uploads/features/${features.imageUrl}`
          if (currentImage) fs.unlinkSync(currentImage)

          let payload = {
            name,
            qty,
            imageUrl: filename,
            items
          }

          await Feature.findByIdAndUpdate(id, payload)

          request.flash('message', 'Successfully update data items!')
          request.flash('status', 'success')
          response.redirect(`/items/features/${items}`)
        })
      } else {
        let payload = {
          name,
          qty,
          items,
        }

        await Feature.findByIdAndUpdate(id, payload)
        request.flash('message', 'Successfully update data items!')
        request.flash('status', 'success')
        response.redirect(`/items/features/${items}`)
      }
    } catch (error) {
      request.flash('message', 'Failed delete data!')
      request.flash('status', 'danger')
      response.redirect(`/items/features/${id}`)
    }
  },

  deleteData: async (request, response) => {
    const { id } = request.params
    try {
      const features = await Feature.findById(id)
      const dataItem = await Item.findById(features.items).populate('features')
      const listFeatures = dataItem.features

      const currentImage = `${config.rootPath}/public/assets/uploads/features/${features.imageUrl}`
      console.log(currentImage, 'image')
      if (currentImage) fs.unlinkSync(currentImage)
      listFeatures.map(async (item, index) => {
        if(item._id.toString() === features._id.toString()) {
          listFeatures.splice(index, 1)
          await dataItem.save()
          await Feature.findByIdAndDelete(id)
        }
      })


      request.flash('message', 'Successfully delete data features!')
      request.flash('status', 'success')
      response.redirect(`/items`)
    } catch (error) {
      request.flash('message', 'Failed delete data!')
      request.flash('status', 'danger')
      response.redirect(`/items/features/${id}`)
    }
  }
}