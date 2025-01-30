import express from 'express';
import { auth, adminAuth } from '../middleware/auth';
import { Request } from '../models/Request';

const router = express.Router();

// Create request (public)
router.post('/new', async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    res.status(201).send(request);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all requests (admin only)
router.get('/', adminAuth, async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.send(requests);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update request status (admin only)
router.patch('/:id', adminAuth, async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    /* if (!request) {
      return res.status(404).send();
    } */
    res.send(request);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router; 