const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

module.exports = {
  rootPath: path.resolve(__dirname, '../../'),
  ServiceName: process.env.SERVICE_NAME,
  UrlDb : process.env.MONGODB_URL, 
}