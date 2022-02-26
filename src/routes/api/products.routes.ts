import { Router } from 'express'
import * as controllers from '../../controllers/products.controllers'
import authenticationMiddleware from '../../middleware/authentication.middleware'

const routes = Router()
// api/products
routes.route('/').post(authenticationMiddleware, controllers.createProduct)
routes.route('/').get( controllers.getAllProducts)
routes.route('/:id').get(controllers.getProduct)

export default routes