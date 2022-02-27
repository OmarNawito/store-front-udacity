import supertest from 'supertest'
import app  from '../../../server'
import product from '../../../types/product.type'

const request = supertest(app)

const { name, price, category } = {
    name: 'xperia',
    price: 90000,
    category: 'mobiles',
  }
const { firstname, password } = {
    firstname: 'admin',
    password: 'testpassword',
  }

describe('Test endpoint responses for product resource', () => {
  let authHeader: string
  let product: product

  beforeAll(async () => {
    const response = await request.post('/api/users/login').send({
        firstname,
      password,
    })

    authHeader = `Bearer ${response.body.token}`
  })

  it('creates new product successfully', async () => {
    const response = await request
      .post('/api/products')
      .send({
        name,
        price,
        category,
      })
      .set('Accept', 'application/json')
      .set('Authorization', authHeader)

    product = response.body

    expect(response.body).toEqual(
      jasmine.objectContaining({
        name,
        price,
        category,
      })
    )
  })

  it('gets list of products successfully with auth token not passed in request', async () => {
    const response = await request
      .get('/api/products')
      .set('Accept', 'application/json')

    expect(response.status).toBe(200)
    expect(response.body).toBeTruthy()
    expect(response.body.length).toEqual(1)
  })

  it('gets details of a specific product successfully with auth token not passed in request', async () => {
    const response = await request
      .get(`/api/products/${product.id}`)
      .set('Accept', 'application/json')

    expect(response.body).toEqual(
      jasmine.objectContaining({
        id: product.id,
        name,
        price,
        category,
      })
    )
  })
})