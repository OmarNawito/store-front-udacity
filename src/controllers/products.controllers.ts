import { Request, Response, NextFunction } from 'express'
import ProductModel from '../models/product'

const productsModel = new ProductModel();

export const createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const product = await productsModel.createProduct(req.body)
      res.json({
        status: 'success',
        data: { ...product },
        message: 'product created successfully',
      })
    } catch (err) {
      next(err)
    }
  }
  
  export const getAllProducts = async (
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const products = await productsModel.getAllProducts()
      res.json({
        status: 'success',
        data: products,
        message: 'Products retrieved successfully',
      })
    } catch (err) {
      next(err)
    }
  }
  
  export const getProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const product = await productsModel.getProduct(req.params.id as unknown as string)
      res.json({
        status: 'success',
        data: product,
        message: 'product retrieved successfully',
      })
    } catch (err) {
      next(err)
    }
  }