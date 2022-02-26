import { Router } from 'express'
import * as controllers from '../../controllers/orders.controllers'
import authenticationMiddleware from '../../middleware/authentication.middleware'

const routes = Router()
// api/products
routes.route('/').post(controllers.createOrder)
routes.route('/').get( controllers.getAllOrders)
routes.route('/:id').get(authenticationMiddleware, controllers.getOrder)


export default routes