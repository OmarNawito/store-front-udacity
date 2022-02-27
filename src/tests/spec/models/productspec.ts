import Product from '../../../models/product'
import product from '../../../types/product.type'

const productStore = new Product()

const payload: product = {
  name: 'product 1',
  price: 456,
}

describe('Product Model ', () => {
  let product: product

  it('should have an index method', () => {
    expect(productStore.getAllProducts).toBeDefined()
  })

  it('should have a show method', () => {
    expect(productStore.getProduct).toBeDefined()
  })

  it('should have a create method', () => {
    expect(productStore.createProduct).toBeDefined()
  })

  it('create method should add a new product', async () => {
    product = await productStore.createProduct(payload)

    expect(product).toEqual(jasmine.objectContaining(payload))
  })

  it('index method should return a list of products', async () => {
    const result = await productStore.getAllProducts()

    const filteredProduct = result.filter((item) => item.id === product.id)

    expect(filteredProduct).toEqual([
      {
        id: product.id,
        ...payload,
      },
    ])
  })

  it('show method should return the correct product', async () => {
    const result = await productStore.getProduct(product.id as string)

    expect(result).toEqual({
      id: product.id,
      ...payload,
    })
  })
})