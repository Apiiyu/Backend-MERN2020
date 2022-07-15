const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: '/public/assets/uploads/banks',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const checkFileType = (file, cb) => {
  const fileTypes = /jpeg|jpg|png|svg|gif/
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimeType = fileTypes.test(file.mimetype)

  if (mimeType && extName) {
    return cb(null, true)
  } else {
    cb('Error: Images Only!')
  }
}

const upload = multer({
  storage,
  limits: {
    fileSize: 100000
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  }
})

module.exports = { upload }