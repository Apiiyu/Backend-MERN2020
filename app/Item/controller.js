const Category = require('../Category/model')
const Item = require('./model')
const Image = require('../Image/model')
const fs = require('fs')
const path = require('path')
const config = require('../../config/env')

module.exports = {
  viewItem: async (request, response) => {
    try {
      const categories = await Category.find()
      const data = await Item.find()
      .populate({ path: 'images', select: 'id imagesUrl'})
      .populate({ path: 'categories', select: 'id name'})
      const message = request.flash('message')
      const status = request.flash('status')
      const alert = {message, status}

      response.render('admin/item/v_item', {
        title: 'Items',
        url: '/items',
        alert,
        data,
        categories,
        action: 'view'
      })
    } catch (error) {
      request.flash('message', 'Failed get data!')
      request.flash('status', 'danger')
      response.redirect('/items')
    }
  },

  viewImages: async (request, response) => {
    try {
      const { id } = request.params
      const data = await Item.findById(id).populate({ path: 'images', select: 'id imageUrl'})
      console.log({data})
      const message = request.flash('message')
      const status = request.flash('status')
      const alert = {message, status}

      response.render('admin/item/v_item', {
        title: 'Images Items',
        url: '/items',
        alert,
        data,
        action: 'viewImages'
      })
      
    } catch (error) {
      request.flash('message', 'Failed get data!')
      request.flash('status', 'danger')
      response.redirect('/items')
    }
  },

  viewUpdate: async (request, response) => {
    try {
      const { id } = request.params
      const data = await Item.findById(id).populate({ path: 'images', select: 'id imageUrl'})
      const categories = await Category.find()
      const message = request.flash('message')
      const status = request.flash('status')
      const alert = {message, status}

      response.render('admin/item/v_item', {
        title: 'Update Items',
        url: '/items',
        alert,
        data,
        categories,
        action: 'viewEdit'
      })
    } catch (error) {
      request.flash('message', 'Failed get data!')
      request.flash('status', 'danger')
      response.redirect('/items')
    }
  },

  createData: async (request, response) => {
    try {
      const { title, price, categories, city, country, description } = request.body
      const images = request.files
      
      if (images.length > 0) {
        const payload = {
          title,
          price,
          categories,
          city,
          country,
          description
        }
        const newDataItems = await Item.create(payload)
        const selectedCategory = await Category.findById(categories)
        selectedCategory.items.push({ _id: newDataItems._id })

        images.map(async (item, index) => {
          let tmp_path = item.path
          let originalExt = item.originalname.split('.')[item.originalname.split('.').length - 1]
          let filename = item.filename + '.' + originalExt
          let target_path = path.resolve(config.rootPath, `public/assets/uploads/items/${filename}`)
        
          const src = fs.createReadStream(tmp_path)
          const destination = fs.createWriteStream(target_path)

          src.pipe(destination)
          src.on('end', async () => {
            let payloadImage = {
              imageUrl: filename
            }

            const selectedImage = await Image.create(payloadImage)
            newDataItems.images.push({_id: selectedImage._id })
            newDataItems.save()
          })
        })

        request.flash('message', 'Successfully create new data items!')
        request.flash('status', 'success')
        response.redirect('/items')
      }
    } catch (error) {
      request.flash('message', 'Failed get data!')
      request.flash('status', 'danger')
      response.redirect('/items')
    }
  },

  updateData: async (request, response) => {
    try {
      const { id } = request.params
      const { title, price, categories, city, country, description } = request.body
      const images = request.files
      const selectedItem = await Item.findById(id).populate({ path: 'images', select: 'id imageUrl'})
      .populate({ path: 'categories', select: 'id name'})
      const collectionImages = selectedItem.images

      if (images.length > 0) {
        images.map(async (items, index) => { // --> Create new array request file
          collectionImages.map( async(img, imgIndex) => { // --> Create new array file images item
            const selectImage = await Image.findById(img._id)
            const currentImages = `${config.rootPath}/public/assets/uploads/items/${selectImage.imageUrl}`
            if (currentImages) fs.unlinkSync(currentImages) // --> Remove current images

            await Image.findByIdAndDelete(img._id)
          })

          let tmp_path = items.path
          let originalExt = items.originalname.split('.')[items.originalname.split('.').length - 1]
          let filename = items.filename + '.' + originalExt
          let target_path = path.resolve(config.rootPath, `public/assets/uploads/items/${filename}`)
          console.log({filename})
  
          const src = fs.createReadStream(tmp_path)
          const destination = fs.createWriteStream(target_path)

          src.pipe(destination)
          src.on('end', async () => {
            const payloadImage = { imageUrl: filename }
            const newImage = await Image.create(payloadImage)
            const payload = {
              title,
              price,
              categories,
              city,
              country,
              images: newImage._id,
              description
            }

            selectedItem.update(payload)
            request.flash('message', 'Successfully update data items!')
            request.flash('status', 'success')
            response.redirect('/items')
          })
        })
      }

    } catch (error) {
      request.flash('message', 'Failed update data!')
      request.flash('status', 'danger')
      response.redirect('/items')
    }
  },

  deleteData: async (request, response) => {
    try {
      const { id } = request.params
      const items = await Item.findById(id).populate({ path: 'images', select: 'id imagesUrl'})
      const images = items.images

      images.map(async (item, index) => {
        let selectImage = await Image.findById(item._id)
        const currentImages = `${config.rootPath}/public/assets/uploads/items/${selectImage.imageUrl}`
        if (currentImages) fs.unlinkSync(currentImages) // --> Remove current images
        await Image.findByIdAndDelete(selectImage._id) // --> Remove images from database
       })
      
      await Item.findByIdAndDelete(id)

      request.flash('message', 'Successfully delete data items!')
      request.flash('status', 'success')
      response.redirect('/items')
    } catch (error) {
      request.flash('message', 'Failed delete data!')
      request.flash('status', 'danger')
      response.redirect('/items')
    }
  }
}