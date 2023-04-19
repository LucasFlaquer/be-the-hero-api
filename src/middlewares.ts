import { NextFunction, Request, Response } from 'express';

export function Authorization(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    return res.status(400).json({
      message: 'Must provide a ong_id to create an incident'
    })
  }
  next();
}