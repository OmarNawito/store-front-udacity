import supertest from 'supertest'
import app  from '../../../server'
import order  from '../../../types/orders.type'
import product  from '../../../types/product.type'

const request = supertest(app)

const { name, price } = {
    name: 'Iphone',
    price: 90000,
  }
const { first_name, password } = {
    first_name: 'test12111',
    password: 'test12111',
  }

describe('Test endpoint responses for order resource', () => {
  let authHeader: string
  let userId: string
  let order: order
  let product: product
  beforeAll(async () => {
    const userRes = await request.post("/api/users").send({
        user_name: "test12111",
        first_name,
        last_name: "test12111",
        email: "test1111111@hotmail.com1",
        password
      });
    const response = await request.post('/api/users/authenticate').send({
      first_name,
      password,
    })

    authHeader = `Bearer ${response.body.data.token}`
    userId = response.body.data.id

    const res = await request
      .post('/api/products')
      .send({
        name,
        price,
      })
      .set('Accept', 'application/json')
      .set('Authorization', authHeader)

    product = res.body.data
  })

  it('creates new order successfully', async () => {
    const response = await request
      .post('/api/orders')
      .send({
        order_status: "open",
        products: [{products_id: product.id, product_quantity: 5}],
        users_id: userId, 
      })
      .set('Accept', 'application/json')
      .set('Authorization', `${authHeader}`)
        console.log('order', response.body)
        order = response.body.data
    expect(order).toEqual(
      jasmine.objectContaining({
        order_status: 'open',
        users_id: userId,
      })
    )
  })
})