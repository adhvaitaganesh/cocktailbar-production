import express, { Request, Response } from 'express';
import { auth, adminAuth } from '../middleware/auth';
import { Booking } from '../models/Booking';

const router = express.Router();

router.post('/new', async (req: Request, res: Response) => {
  try {
    const booking = new Booking({
      ...req.body,
      //customerId: req.customer?.customerId
      //if none found assign a random id
      customerId: req.customer?.customerId || 'randomId'
    });
    await booking.save();
    res.status(201).send(booking);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all bookings (admin only)
router.get('/getBookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: 1 });
    res.send(bookings);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update booking status (admin only)
router.patch('/:id', adminAuth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    // if (!booking) {
    //   return res.status(404).send();
    // }
    res.send(booking);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/bookingss', async (req, res) => {
  try {
    const { name, date, time, guests } = req.body;
    
    const booking = new Booking({
      name,
      date,
      time,
      guests,
      customerId: req.customer?.customerId, // Assuming you have auth middleware
      status: 'pending'
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create booking' });
  }
});

export default router; 