import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Customer } from '../models/Customer';
//import { Router } from 'express';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const customer = new Customer(req.body);
    console.log(customer);
    await customer.save();
    
    const token = jwt.sign(
      { customerId: customer._id, role: customer.role },
      process.env.JWT_SECRET || 'your-secret-key'
    );
    
    res.status(201).send({ customer, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const customer = await Customer.findOne({ email: req.body.email });
    if (!customer) {
      return res.status(404).send({ message: 'Email not found. Please register.' });
    }

    const isMatch = await bcrypt.compare(req.body.password, customer.password);
    if (!isMatch) {
      throw new Error('Invalid login credentials');
    }

    const token = jwt.sign(
      { customerId: customer._id, role: customer.role },
      process.env.JWT_SECRET || 'your-secret-key'
    );
    
    res.cookie('token', token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only use secure in production
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    res.send({ user: customer, token }); // Changed from customer to user to match type
    
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

router.get('/check-status', async (req: Request, res: Response) => {
  try {
    // Get token from cookie or Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    
    
    if (!token) {
      return res.status(401).send({ message: 'No token found' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { customerId: string, role: string };
    
    // Find customer with role
    const customer = await Customer.findById(decoded.customerId).select('-password');
    
    if (!customer) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Send response with both user data and token
    res.send({ 
      user: customer,
      isAuthenticated: true 
    });

  } catch (error) {
    console.error('Check status error:', error);
    res.status(401).send({ 
      message: 'Invalid token',
      isAuthenticated: false 
    });
  }
});

router.post('/logout', (_req: Request, res: Response) => {
  res.cookie('token', '', { 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0  // Expire immediately
  });
  
  res.status(200).send({ 
    message: 'Logged out successfully',
    isAuthenticated: false 
  });
});

export default router; 