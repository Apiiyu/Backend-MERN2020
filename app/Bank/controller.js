const Bank = require('./model')
const path = require('path')
const fs = require('fs')
const config = require('../../config/env')

module.exports = {
  viewBank: async (request, response) => {
    try {
      const data = await Bank.find()
      const message = request.flash('message')
      const status = request.flash('status')
      const alert = {message, status}
      
      response.render('admin/bank/v_bank', {
        title: 'Bank',
        url: '/bank',
        data,
        alert
      })
    } catch (error) {
      request.flash('message', 'Failed get data bank!')
      request.flash('status', 'danger')
      response.redirect('/bank')
    }
  },
  
  createData: async (request, response) => {
    try {
      const { bankName, accountNumber, name } = request.body
      let payload 

      if(request.file) {
        let tmp_path = request.file.path
        let originalExt = request.file.originalname.split('.')[request.file.originalname.split('.').length - 1]
        let filename = request.file.filename + '.' + originalExt
        let target_path = path.resolve(config.rootPath, `public/assets/uploads/banks/${filename}`)
      
        const src = fs.createReadStream(tmp_path)
        const destination = fs.createWriteStream(target_path)

        src.pipe(destination)
        src.on('end', async () => {
          payload = {
            bankName,
            accountNumber,
            name,
            imageUrl: filename
          }

          await Bank.create(payload)
          request.flash('message', 'Successfully create new data bank!')
          request.flash('status', 'success')
          response.redirect('/bank')
        })
      } else {
        payload = {
          bankName,
          accountNumber,
          name
        }

        await Bank.create(payload)
        request.flash('message', 'Successfully create new data bank!')
        request.flash('status', 'success')
        response.redirect('/bank')
      }
    } catch (error) {
      request.flash('message', 'Failed create new data bank!')
      request.flash('status', 'danger')
      response.redirect('/bank')
    }
  },

  updateData: async (request, response) => {
    try {
    const { id, bankName, accountNumber, name } = request.body
      let payload 

      if(request.file) {
        let tmp_path = request.file.path
        let originalExt = request.file.originalname.split('.')[request.file.originalname.split('.').length - 1]
        let filename = request.file.filename + '.' + originalExt
        let target_path = path.resolve(config.rootPath, `public/assets/uploads/banks/${filename}`)
      
        const src = fs.createReadStream(tmp_path)
        const destination = fs.createWriteStream(target_path)

        src.pipe(destination)
        src.on('end', async () => {
          let selectedBank = await Bank.findById(id)
          let currentImage = `${config.rootPath}/public/assets/uploads/banks/${selectedBank.imageUrl}`
          // --> Check file if exists
          if (fs.existsSync(currentImage)) fs.unlinkSync(currentImage)

          payload = {
            bankName,
            accountNumber,
            name,
            imageUrl: filename
          }

          selectedBank = await Bank.findByIdAndUpdate(id, payload)
          request.flash('message', 'Successfully create new data bank!')
          request.flash('status', 'success')
          response.redirect('/bank')
        })
      } else {
        payload = {
          bankName,
          accountNumber,
          name
        }

        await Bank.findByIdAndUpdate(id, payload)
        request.flash('message', 'Successfully update data bank!')
        request.flash('status', 'success')
        response.redirect('/bank')
      }
    } catch (error) {
      request.flash('message', 'Failed update data bank!')
      request.flash('status', 'danger')
      response.redirect('/bank')
    }
  },

  deleteData: async (request, response) => {
    try {
      const { id } = request.params
      const selectedBank = await Bank.findById(id)
      let currentImage = `${config.rootPath}/public/assets/uploads/banks/${selectedBank.imageUrl}`
      // --> Check file if exists
      if (fs.existsSync(currentImage)) fs.unlinkSync(currentImage)

      selectedBank.remove()
      request.flash('message', 'Successfully delete data bank!')
      request.flash('status', 'success')
      response.redirect('/bank')
    } catch (error) {
      request.flash('message', 'Failed delete data bank!')
      request.flash('status', 'danger')
      response.redirect('/bank')
    }
  }
}