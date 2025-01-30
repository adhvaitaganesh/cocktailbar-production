import express from 'express';
import { adminAuth } from '../middleware/auth';
import { Announcement } from '../models/Announcement';

const router = express.Router();

// Create announcement (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const announcement = new Announcement(req.body);
    await announcement.save();
    res.status(201).send(announcement);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all announcements (public)
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find({ active: true });
    res.send(announcements);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update announcement (admin only)
router.patch('/:id', adminAuth, async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    /* if (!announcement) {
      return res.status(404).send();
    } */
    res.send(announcement);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete announcement (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) {
      return res.status(404).send();
    }
    res.send(announcement);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router; 