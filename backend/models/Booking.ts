import mongoose from 'mongoose';

export interface Booking {
  _id: string;
  customerId: string | undefined;
  name: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed';
}

const bookingSchema = new mongoose.Schema<Booking>({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed'],
    default: 'pending',
  },
}, { timestamps: true });

export const Booking = mongoose.model<Booking>('Booking', bookingSchema); 