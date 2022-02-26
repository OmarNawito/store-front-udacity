import { Router } from 'express'
import * as controllers from '../../controllers/users.controllers'


const routes = Router()
// api/users
routes.route('/').post(controllers.create)
routes.route('/:id').get(controllers.getOne)
routes.route('/').get(controllers.getMany)
// authentication
routes.route('/authenticate').post(controllers.authenticate)
export default routes