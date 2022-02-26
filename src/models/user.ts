import User from "../types/user.type"
import db from '../database'
import bcrypt from 'bcrypt'
import config from '../config'

const hashPassword = (password: string) => {
    const salt = parseInt(config.salt as string, 10)
    return bcrypt.hashSync(`${password}${config.pepper}`, salt)
}
class UserModel {
    // create new user
    async create(u: User): Promise<User> {
        try {
            console.log('u', u)
            const connection = await db.connect()
            const sql = `INSERT INTO users (email, user_name, first_name, last_name, password) 
                  values ($1, $2, $3, $4, $5) 
                  RETURNING id, email, user_name, first_name, last_name`
            const result = await connection.query(sql, [
                u.email,
                u.user_name,
                u.first_name,
                u.last_name,
                hashPassword(u.password as string),
            ])
            connection.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(
                `Unable to create (${u.user_name}): ${(error as Error).message}`
            )
        }
    }

}
export default UserModel