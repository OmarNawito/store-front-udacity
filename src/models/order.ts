import db from '../database'
import order from '../types/orders.type';

class OrderModel{
    // create an order
    async createOrder(order:order):Promise<order>{
        const {products} = order
        console.log('products', order)
        try {
            const connection = await db.connect();
            const query = `INSERT INTO orders (users_id,order_status) 
            values ($1, $2) 
            RETURNING order_id,users_id,order_status`
            const result = await connection.query(query,[
                order.users_id,
                order.order_status])
                
      const orderProductsSql = "INSERT INTO order_products (orders_id, products_id, product_quantity) VALUES($1, $2, $3) RETURNING products_id, product_quantity"
      const orderProducts = []

      for (const product of products) {
        const {products_id, product_quantity} = product

        const {rows} = await connection.query(orderProductsSql, [order.order_id, products_id, product_quantity])

        orderProducts.push(rows[0])
      }
            connection.release();  
            return {...result.rows[0],products:orderProducts}
        } catch (error) {
            throw new Error(`Unable to create order (${order.order_id}): ${(error as Error).message}`)
        }
    }
// show index (getAll products)
    async getAllOrders(): Promise<order[]> {
        try {
        const connection = await db.connect()
        const sql =
            'SELECT order_id,users_id,order_status from orders'
        const result = await connection.query(sql)
        
      const orderProductsSql = "SELECT products_id, product_quantity FROM order_products WHERE orders_id=($1)"
      const orders = []
      for (const order of result.rows) {
        const {rows: orderProductRows} = await connection.query(orderProductsSql, [order.id])
        orders.push({
          ...order,
          products: orderProductRows
        })
      }
        connection.release()
        return orders
        } catch (error) {
        throw new Error(`Error at retrieving orders ${(error as Error).message}`)
        }
    }
 // get specific product
 async getOrder(users_id: string): Promise<order> {
    try {
      const sql = `SELECT order_id, users_id,
      order_status FROM orders 
      WHERE users_id= $1 `

      const connection = await db.connect()

      const result = await connection.query(sql, [users_id])
      const orderProductsSql = "SELECT products_id, product_quantity FROM order_products WHERE order_id=($1)"
      const {rows: orderProductRows} = await connection.query(orderProductsSql, [users_id])

      connection.release()
      return {...result.rows[0],products:orderProductRows}
    } catch (error) {
      throw new Error(`Could not find user ${users_id}, ${(error as Error).message}`)
    }
  }
}


export default OrderModel