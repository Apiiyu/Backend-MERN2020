const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHttp)

describe('Test API Endpoint', () => {
  it('Hit API Landing Page, Should return response data', (done) => {
    chai.request(app).get('/api/v1/landing-page').end((error, response) => {
      expect(error).to.be.null
      expect(response).to.have.status(200)
      expect(response.body).to.be.an('object')
      expect(response.body).to.have.property('hero')
      expect(response.body.hero).to.have.all.keys('travelers', 'treasures', 'cities')
      expect(response.body).to.have.property('mostPicked')
      expect(response.body.mostPicked).to.have.an('array')
      expect(response.body).to.have.property('categoies')
      expect(response.body.categories).to.have.an('array')
      expect(response.body).to.have.property('testimonial')
      expect(response.body.testimonial).to.have.an('object')
    })
    done()
  })

  it('Hit API Detail, Should return response data', (done) => {
    chai.request(app).get('/api/v1/detail/5e96cbe292b97300fc902230').end((error, request, response) => {
      expect(error).to.be.null
      expect(request).to.have.contains('5e96cbe292b97300fc902230')
      expect(response).to.have.status(200)
      expect(response).to.be.an('object') 
      expect(response.body).to.have.property('images')
      expect(response.body).to.have.property('features')
      expect(response.body).to.have.property('activities')
      expect(response.body).to.have.property('banks')
      expect(response.body.banks).to.have.an('array')
      expect(response.body).to.have.property('testimonial')
      expect(response.body.testimonial).to.have.an('object')
    })
    done()
  })

  it('Hit API Booking, Should send data and return response data', (done) => {
    const image = __dirname + '/bukti.jpeg'
    const payload = {
      items: '5e96cbe292b97300fc902230',
      duration: 2,
      startDate: '2022-01-01',
      endDate: '2022-01-07',
      firstName: 'Rafi',
      lastName: 'Khoirulloh',
      email: 'khoirulloh.rafi2@gmail.com',
      phoneNumber: '082120806320',
      bankHolder: 'Staycation.id',
      bankFrom: 'Bank Jago'
    }

    chai.request(app).post('/api/v1/booking').set('Content-Type', 'application/x-www-form-urlencoded')
    .field('itemsId', payload.items).field('duration', payload.duration).field('startDate', payload.startDate)
    .field('endDate', payload.endDate).field('firstName', payload.firstName).field('lastName', payload.lastName)
    .field('email', payload.email).field('phoneNumber', payload.phoneNumber).field('bankHolder', payload.bankHolder)
    .field('bankFrom', payload.bankFrom).attach('proofPayment', image)
    .end((error, response) => {
      expect(error).to.be.null
      expect(response).to.have.status(201)
      expect(response).to.be.an('object') 
      expect(response).to.have.property('data')
      expect(response.data).to.be.an('object')
      expect(response.data.payments).to.be.an('object')
      expect(response.data.payments.proofPayment).to.not.null
      expect(response.data.members).to.not.null
    })

    done()
  })
})