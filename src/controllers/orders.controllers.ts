import { Request, Response, NextFunction } from 'express'
import OrderModel from '../models/order';

const orderModel = new OrderModel();

export const createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log('req.body', req.body)
      const order = await orderModel.createOrder(req.body)
      res.json({
        status: 'success',
        data: { ...order },
        message: 'order created successfully',
      })
    } catch (err) {
      next(err)
    }
  }
  
  export const getAllOrders = async (
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const orders = await orderModel.getAllOrders()
      res.json({
        status: 'success',
        data: orders,
        message: 'orders retrieved successfully',
      })
    } catch (err) {
      next(err)
    }
  }
  
  export const getOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const order = await orderModel.getOrder(req.params.id as unknown as string)
      res.json({
        status: 'success',
        data: order,
        message: 'order retrieved successfully',
      })
    } catch (err) {
      next(err)
    }
  }