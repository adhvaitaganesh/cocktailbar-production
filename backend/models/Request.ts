import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['new', 'replied'],
    default: 'new',
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0],
  },
}, { timestamps: true });

export const Request = mongoose.model('Request', requestSchema); 