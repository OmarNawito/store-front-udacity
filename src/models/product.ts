import db from '../database'
import product from '../types/product.type'

class ProductModel{
    // create a product
    async createProduct(prod:product):Promise<product>{
        try {
            const connection = await db.connect();
            const query = `INSERT INTO products (name,price) 
            values ($1, $2) 
            RETURNING id, name, price`
            const result = await connection.query(query,[
                prod.name,
                prod.price])
            connection.release();
            return result.rows[0]
        } catch (error) {
            throw new Error(`Unable to create (${prod.name}): ${(error as Error).message}`)
        }
    }
// show index (getAll products)
    async getAllProducts(): Promise<product[]> {
        try {
        const connection = await db.connect()
        const sql =
            'SELECT id, name, price from products'
        const result = await connection.query(sql)
        connection.release()
        return result.rows
        } catch (error) {
        throw new Error(`Error at retrieving products ${(error as Error).message}`)
        }
    }
 // get specific product
 async getProduct(id: string): Promise<product> {
    try {
      const sql = `SELECT id, name, price FROM products 
      WHERE id=($1)`

      const connection = await db.connect()

      const result = await connection.query(sql, [id])

      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not find product ${id}, ${(error as Error).message}`)
    }
  }

  async getTopFiveMostPopularProducts(): Promise<product[]> {
    try {
      const sql =
        'SELECT p.id, p.name, p.price, p.category FROM order_products op INNER JOIN products p ON op.product_id = p.id GROUP BY p.id ORDER BY SUM(op.quantity) DESC LIMIT 5'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql)

      const products: product[] = result.rows

      conn.release()

      return products
    } catch (err) {
      throw new Error(
        `DB error retrieving top 5 most popular products. Error: ${err}`
      )
    }
  }
}


export default ProductModel