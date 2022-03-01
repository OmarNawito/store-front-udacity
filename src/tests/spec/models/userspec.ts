import UserModel from '../../../models/user'
import user from '../../../types/user.type'

const store = new UserModel()

describe('User Model ', () => {
    let user: user

    it('should have an index method', () => {
        expect(store.getMany).toBeDefined()
    })

    it('should have a show method', () => {
        expect(store.getOne).toBeDefined()
    })

    it('should have a create method', () => {
        expect(store.create).toBeDefined()
    })

    it('create method should add a new user', async () => {
        user = await store.create({
            first_name: 'First Name',
            last_name: 'Last Name',
            user_name: 'User Name',
            password: 'test@password',
            email: 'test@test.com'
        })

        expect(user).toEqual(
            jasmine.objectContaining({
                id: user.id,
                first_name: 'First Name',
                last_name: 'Last Name',
                user_name: 'User Name',
            })
        )
    })

    it('index method should return a list of users', async () => {
        const result = await store.getMany()

        const filteredResult = result.filter((item) => user.id === item.id)

        expect(filteredResult[0]).toEqual(
            jasmine.objectContaining({
                id: user.id,
                first_name: 'First Name',
                last_name: 'Last Name',
                user_name: 'User Name',
            })
        )
    })

    it('show method should return the correct user', async () => {
        const result = await store.getOne(user.id as string)
        console.log('resultasssssssss', result)

        expect(result).toEqual(
            jasmine.objectContaining({
                id: user.id,
                first_name: 'First Name',
                last_name: 'Last Name',
                user_name: 'User Name',
            })
        )
    })
})