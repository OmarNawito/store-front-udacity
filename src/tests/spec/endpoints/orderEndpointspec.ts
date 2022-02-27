import supertest from 'supertest'
import app  from '../../../server'
import order  from '../../../types/orders.type'
import product  from '../../../types/product.type'

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

describe('Test endpoint responses for order resource', () => {
  let authHeader: string
  let userId: string
  let order: order
  let product: product

  beforeAll(async () => {
    const response = await request.post('/api/users/authenticate').send({
        firstname,
      password,
    })

    authHeader = `Bearer ${response.body.token}`
    userId = response.body.userId

    const res = await request
      .post('/api/products')
      .send({
        name,
        price,
        category,
      })
      .set('Accept', 'application/json')
      .set('Authorization', authHeader)

    product = res.body
  })

  it('creates new order successfully', async () => {
    const response = await request
      .post('/api/orders')
      .set('Accept', 'application/json')
      .set('Authorization', `${authHeader}`)

    order = response.body

    expect(order).toEqual(
      jasmine.objectContaining({
        status: 'open',
        user_id: userId,
      })
    )
  })

  it('product can be added successfully to an order with auth token passed in request', async () => {
    const response = await request
      .post(`/api/orders/${order.id}`)
      .send({
        productId: product.id,
        quantity: 5,
      })
      .set('Accept', 'application/json')
      .set('Authorization', `${authHeader}`)

    expect(response.body).toEqual(
      jasmine.objectContaining({
        quantity: 5,
        order_id: order.id,
        product_id: product.id,
      })
    )
  })
})