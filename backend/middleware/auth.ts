import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Customer } from '../models/Customer';

interface JwtPayload {
  customerId: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      customer?: JwtPayload;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as JwtPayload;
    req.customer = decoded;
    
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

export const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.headers);
    console.log(req.headers.authorization);
    
    const token = req.headers.authorization?.replace('Bearer ', '');
    console.log(token);
    console.log(req.headers);
    console.log(req.headers.authorization);
    
    if (!token) {
      console.log('No token found');
      console.log(req.headers);
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as JwtPayload;
    
    if (decoded.role !== 'admin') {
      console.log('Not admin');
      throw new Error();
    }

    req.customer = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: 'Admin access required.' });
  }
};