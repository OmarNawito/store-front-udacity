import { Router } from 'express'
import * as controllers from '../../controllers/users.controllers'
import authenticationMiddleware from '../../middleware/authentication.middleware'


const routes = Router()
// api/users
routes.route('/').post(controllers.create)
routes.route('/:id').get(authenticationMiddleware, controllers.getOne)
routes.route('/').get(authenticationMiddleware, controllers.getMany)
routes.route('/').delete(controllers.remove)
// authentication
routes.route('/authenticate').post(controllers.authenticate)
export default routes