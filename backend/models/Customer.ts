import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface Customer {
  _id: string;
  email: string;
  password: string;
  role: 'admin' | 'customer';
}

const customerSchema = new mongoose.Schema<Customer>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer',
  },
}, { timestamps: true });

customerSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const Customer = mongoose.model<Customer>('Customer', customerSchema); 