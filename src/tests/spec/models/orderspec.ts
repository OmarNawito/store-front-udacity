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

    beforeAll(async () => {
      await user.create({
        first_name: 'omar',
        last_name: 'nawito',
        email: 'test@test.com',
        user_name: 'test',
        password: 'thisismeenow2020#'
      });
      await product.createProduct({
        name: 'iPhone',
        price: 645,
      });
    });

    it('should create order using createOrder method', async () => {
      const result: order = await order.createOrder({
        products: [],
        users_id: '1',
        order_status: 'open'
      });
      expect(result).toEqual({
        id: '1',
        products: [],
        users_id: '1',
        order_status: 'open'
      });
    });
  });
});