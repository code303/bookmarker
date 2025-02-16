const express = require('express');
const router = express.Router();

// Define routes for bookmarks
router.get('/', (req, res) => {
  res.send('Get all bookmarks');
});

router.post('/', (req, res) => {
  res.send('Add a new bookmark');
});

router.put('/:id', (req, res) => {
  res.send(`Update bookmark with id ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
  res.send(`Delete bookmark with id ${req.params.id}`);
});

module.exports = router;
