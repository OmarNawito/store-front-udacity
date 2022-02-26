import { Router } from 'express'
import * as controllers from '../../controllers/orders.controllers'

const routes = Router()
// api/products
routes.route('/').post(controllers.createOrder)
routes.route('/').get( controllers.getAllOrders)
routes.route('/:id').get(controllers.getOrder)


export default routes