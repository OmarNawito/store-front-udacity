import { Router } from 'express'


const routes = Router()
// api/users
routes.route('/').get(() => console.log('users'))
export default routes