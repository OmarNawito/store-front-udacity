import { Router } from 'express'
import * as controllers from '../../controllers/products.controllers'

const routes = Router()
// api/products
routes.route('/').post(controllers.createProduct)
routes.route('/').get( controllers.getAllProducts)
routes.route('/:id').get(controllers.getProduct)

export default routes