import order_products from "./order-products.type"

type order = {
  id?: string
  order_id?: string
  users_id:string
  order_status: string
  products:order_products[]
  }

  export default order