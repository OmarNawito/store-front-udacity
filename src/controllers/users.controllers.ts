import { Request, Response, NextFunction } from 'express'
import UserModel from '../models/user'

const userModel = new UserModel()

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.create(req.body)
        res.json({
            status: 'success',
            data: { ...user },
            message: 'User created successfully',
        })
    } catch (error) {
        next(error)
    }
}
// find one user
export const getOne = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await userModel.getOne(req.params.id as unknown as string)
        res.json({
            status: 'success',
            data: user,
            message: 'User retrieved successfully',
        })
    } catch (err) {
        next(err)
    }
}

export const getMany = async (
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const users = await userModel.getMany()
      res.json({
        status: 'success',
        data: users,
        message: 'User retrieved successfully',
      })
    } catch (err) {
      next(err)
    }
  }