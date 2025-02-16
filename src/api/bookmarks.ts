import express, { Request, Response } from 'express';
const router = express.Router();

// routes for bookmarks
router.get('/', (req: Request, res: Response) => {
  res.send('Get all bookmarks');
});

router.post('/', (req: Request, res: Response) => {
  res.send('Add a new bookmark');
});

router.put('/:id', (req: Request, res: Response) => {
  res.send(`Update bookmark with id ${req.params.id}`);
});

router.delete('/:id', (req: Request, res: Response) => {
  res.send(`Delete bookmark with id ${req.params.id}`);
});

module.exports = router;
