import express, { Request, Response } from 'express';
import { auth, adminAuth } from '../middleware/auth';
import { Booking } from '../models/Booking';

const router = express.Router();

router.post('/new', auth, async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    //console.log(req.body);
    const booking = new Booking({
      ...req.body,
      //request has already customer id
      //customerId: req.customer?.customerId || 'randomId'
    });
    console.log(booking);
    await booking.save();
    console.log("booking saved");
    res.status(201).send(booking);
    console.log("booking sent");
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all bookings (admin only)
router.get('/getBookings', adminAuth, async (req, res) => {
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

// Delete booking (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found' });
    }
    res.send({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router; 