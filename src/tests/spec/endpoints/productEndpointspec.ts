import supertest from 'supertest'
import app  from '../../../server'
import product from '../../../types/product.type'

const request = supertest(app)

const { name, price } = {
    name: 'Iphone',
    price: 90000,
  }
const { first_name, password } = {
    first_name: 'test1211',
    password: 'test1211',
  }
  let product: product
describe('Test endpoint responses for product resource', () => {
  let authHeader: string
  
  let user_id: number;
  beforeAll(async () => {
        const res = await request.post("/api/users").send({
          user_name: "test1211",
          first_name,
          last_name: "test1211",
          email: "test1111111@hotmail.com",
          password
        });
        user_id = res.body.data.id;

    const response = await request.post('/api/users/authenticate').send({
      first_name,
      password,
    })
    authHeader = `Bearer ${response.body.data.token}`
  })

  it('creates new product successfully', async () => {
    const response = await request
      .post('/api/products')
      .send({
        name,
        price,
      })
      .set('Accept', 'application/json')
      .set('Authorization', authHeader)

    product = response.body.data
    expect(product).toEqual(
      jasmine.objectContaining({
        name,
        price,
      })
    )
  })

  it('gets list of products successfully with auth token not passed in request', async () => {
    const response = await request
      .get('/api/products')
      .set('Accept', 'application/json')

    expect(response.status).toBe(200)
    expect(response.body).toBeTruthy()
    expect(response.body.data.length).toEqual(response.body.data.length)
  })

  it('gets details of a specific product successfully with auth token not passed in request', async () => {
    const response = await request
      .get(`/api/products/${product.id}`)
      .set('Accept', 'application/json')

    expect(response.body.data).toEqual(
      jasmine.objectContaining({
        id: product.id,
        name,
        price,
      })
    )
  })
})