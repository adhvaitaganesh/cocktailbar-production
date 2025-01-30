import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  offerTitle: {
    type: String,
    required: true,
  },
  offerDescription: {
    type: String,
    required: true,
  },
  promoCode: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export const Announcement = mongoose.model('Announcement', announcementSchema); 