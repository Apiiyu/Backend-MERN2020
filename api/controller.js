const Item = require('../app/Item/model')
const Activity = require('../app/Activity/model')
const Booking = require('../app/Booking/model')
const Category = require('../app/Category/model')
const Bank = require('../app/Bank/model')
const Member = require('../app/Member/model')
const config = require('../config/env')
const fs = require('fs')

module.exports = {
  landingPage: async (request, response) => {
    try {
      const mostPicked = await Item.find().select('_id title country city price unit images').populate({ path: 'images', select: '_id imageUrl'}).limit(5)
      const travelers = await Booking.find()
      const treasures = await Activity.find()
      const cities = await Item.find()
      const categories = await Category.find().select('_id name').populate({ path: 'items', select: '_id name images country city isPopular', perDocumentLimit: 4, option: { sort: { sumBooking: -1 } }, populate: { path: 'images', select: '_id imageUrl', perDocumentLimit: 1}}).limit(3)
      
      for (let categoriesIndex = 0; categoriesIndex < categories.length; categoriesIndex++) {
        for (let itemsIndex = 0; itemsIndex < categories[categoriesIndex].items.length; itemsIndex++) {
          const itemSelected = await Item.findOne({ _id: categories[categoriesIndex].items[itemsIndex]._id })

          itemSelected.isPopular = false
          await itemSelected.save()

          if (categories[categoriesIndex].items[0] === categories[categoriesIndex].items[itemsIndex]) {
            itemSelected.isPopular = true
            await itemSelected.save()
          }
        }
      }

      const testimonial = {
        _id: '5eag22be292b97300fc903345',
        imageUrl: 'testimonial-1.jpg',
        name: 'Happy Family',
        rate: 4.55,
        content: 'What a great trip with my family and I should try again next time soon ...',
        familyName: 'Rafi Khoirulloh',
        familyOccupation: 'Full Stack Developer'
      }

      response.status(200).json({
        message: 'Successfully get data!',
        hero: {
          travelers: travelers.length,
          treasures: treasures.length,
          cities: cities.length
        },
        mostPicked,
        categories,
        testimonial
      })
      
    } catch (error) {
      response.status(500).json({
        message: 'Failed to get data!',
        data: []
      })
    }
  },

  detailPage: async (request, response) => {
    try {
      const { id } = request.params
      const data =  await Item.findById(id).populate({ path: 'images', select: '_id imageUrl'}).populate({ path: 'features', select: '_id name qty imageUrl'}).populate({ path: 'activities', select: '_id name type imageUrl'})

      const testimonial = {
        _id: '5eag22be292b97300fc903345',
        imageUrl: 'testimonial-2.jpg',
        name: 'Happy Family',
        rate: 4.55,
        content: 'What a great trip with my family and I should try again next time soon ...',
        familyName: 'Rafi Khoirulloh',
        familyOccupation: 'Full Stack Developer'
      }

      const bank = await Bank.find()

      response.status(200).json({
        ...data._doc,
        bank,
        testimonial
      })
    } catch (error) {
      response.status(500).json({
        message: 'Internal Server Error!'
      })
    }
  },

  booking: async (request, response) => {
    try {
      const { itemsId, duration, price, startDate, endDate, firstName, lastName, email, phoneNumber, bankHolder, bankFrom } = request.body

      if (!itemsId || !duration || !startDate || !endDate || !firstName || !lastName || !email || !phoneNumber || !bankHolder || !bankFrom) {
        return response.status(400).json({
          status: 400,
          message: 'Please fill all form'
        })
      }

      if (request.file) {
        let tmp_path = request.file.path
        let originalExt = request.file.originalname.split('.')[request.file.originalname.split('.').length - 1]
        let filename = request.file.filename + '.' + originalExt
        let target_path = `${config.rootPath}/public/assets/uploads/booking/${filename}`

        const src = fs.createReadStream(tmp_path)
        const destination = fs.createWriteStream(target_path)

        src.pipe(destination)
        src.on('end', async () => {
          const item = await Item.findById(itemsId)
          if (!item) return response.status(404).json({ status: 404, message: 'Item Not Found!'})

          item.sumBooking += 1
          item.save()

          let subTotal = item.price * duration
          let TAX = subTotal * 0.10
          let total = subTotal + TAX
          const invoice = Math.floor(1000000 + Math.random() * 9000000)

          const member = await Member.create({
            firstName,
            lastName,
            email,
            phoneNumber
          })

          let payload = {
            invoice,
            startDate,
            endDate,
            total,
            members: member._id,
            items: {
              _id: item._id,
              title: item.title,
              price: item.price,
              duration
            },
            payments: {
              proofPayment: filename,
              bankFrom,
              bankHolder,
            }
          }

          const data = await Booking.create(payload)
          response.status(201).json({
            status: 201,
            message: 'Successfully create new data booking!',
            data
          })
        })
      }
    } catch (error) {
      if(error.name === 'ValidationError') {
        let errors = {};
 
        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });

        console.log(errors)
  
        return response.status(400).json({
          message: errors
        });
      }

      response.status(500).json({
        message: 'Server Internal Error'
      })
    }
  }
}