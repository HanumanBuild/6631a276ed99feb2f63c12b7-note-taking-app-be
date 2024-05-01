const express = require('express');
const Note = require('../models/Note');
const router = express.Router();

// Create Note
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({ title, content });
  try {
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Note
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) res.status(404).json({ error: 'Note not found' });
    res.status(200).json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;