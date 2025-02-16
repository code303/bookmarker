import express, { Request, Response } from 'express';
import Database from '../database/database';
import Bookmark from '../model/bookmark';
const router = express.Router();
const database = Database.getInstance();

// routes for bookmarks
router.get('/', (req: Request, res: Response) => {
  const bookmarks = database.getBookmarks();
  res.send(bookmarks);
});

router.get('/:id', (req: Request, res: Response) => {
  const bookmark: Bookmark = database.getBookmark(req.params.id);
  res.send(bookmark);
});

router.post('/', (req: Request, res: Response) => {

  const result = database.addBookmark(req.params.id);
  res.send('Add a new bookmark');
});

router.put('/:id', (req: Request, res: Response) => {
  res.send(`Update bookmark with id ${req.params.id}`);
});

router.delete('/:id', (req: Request, res: Response) => {
  res.send(`Delete bookmark with id ${req.params.id}`);
});

module.exports = router;
