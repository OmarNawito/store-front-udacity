import Order from '../../../models/order'
import Product from '../../../models/product'
import User from '../../../models/user'
import order from '../../../types/orders.type'


const order: Order = new Order();

describe('Order Model', () => {
  it('should have an getCurrentOrderByUserId  method', () => {
    expect(order.getOrder).toBeDefined();
  });
  it('should have a getOrders method', () => {
    expect(order.getAllOrders).toBeDefined();
  });
  it('should have a createOrder method', () => {
    expect(order.createOrder).toBeDefined();
  });
  describe('Manipulate Order methods', () => {
    const user = new User();
    const product = new Product();
    let userID: string | undefined
    let productData: {} | undefined
    beforeAll(async () => {
      const userRes = await user.create({
        first_name: 'omar',
        last_name: 'nawito',
        email: 'test11111111111111111111111@test.com',
        user_name: 'test',
        password: 'test#'
      });
      userID = userRes.id
      console.log('aaaaaaaaaaaaaaaaaaa', userRes)
      const productRes = await product.createProduct({
        name: 'iPhone',
        price: 645,
      });
      productData = productRes
    });

    it('should create order using createOrder method', async () => {
      const result: order = await order.createOrder({
        products: [],
        users_id: userID as string,
        order_status: 'open'
      });
      console.log('result', result)
      expect(result).toEqual({
        order_id: result.order_id,
        products: [],
        users_id: userID as string,
        order_status: 'open'
      });
    });
  });
});