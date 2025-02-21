import express, { Request, Response } from 'express';
import Database from '../database/database';
import Bookmark from '../model/bookmark';
import createBookmark from '../controller/bookmark';
const router = express.Router();
const database = Database.getInstance();

// routes for bookmarks
router.get('/', (req: Request, res: Response) => {
  const bookmarks = database.getBookmarks();
  res.send(bookmarks);
});

router.get('/:id', (req: Request, res: Response) => {
  const id: string = req.params.id;
  try {
    const bookmark: Bookmark = database.getBookmark(id);
    res.send(bookmark);
  } catch (error) {
    res.status(404).send('Bookmark not found');
  }
});

router.post('/', (req: Request, res: Response) => {
  const bookmark: Bookmark = createBookmark(req.body);
  const createdBookmark = database.addBookmark(bookmark);
  res.send(createdBookmark);
});

router.put('/:id', (req: Request, res: Response) => {
  res.send(`Update bookmark with id ${req.params.id}`);
});

router.delete('/:id', (req: Request, res: Response) => {
  try {
    database.deleteBookmark(req.params.id);
    res.send(`Deleted bookmark with id ${req.params.id}`);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).send(error.message);
    } else {
      res.status(404).send('An unknown error occurred');
    }
  }
});

module.exports = router;
