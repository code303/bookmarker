import express, { Request, Response } from 'express';
import Database from '../database/database';
import Bookmark from '../model/bookmark';
import {createBookmark, createBookmarkWithId} from '../controller/bookmark';
const router = express.Router();
const database = Database.getInstance();

// routes for bookmarks
router.get('/', async (req: Request, res: Response) => {
  const bookmarks = await database.getBookmarks();
  res.json(bookmarks);
});

router.get('/:id', async (req: Request, res: Response) => {
  const id: string = req.params.id;
  try {
    const bookmark: Bookmark = await database.getBookmark(id);
    res.json(bookmark);
  } catch (error: Error | any) {
    res.status(404).send(error.message);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const bookmark: Bookmark = createBookmark(req.body);
  const createdBookmark = await database.addBookmark(bookmark);
  res.json(createdBookmark);
});

router.put('/:id', async (req: Request, res: Response) => {
  const bookmark: Bookmark = createBookmarkWithId(req.params.id, req.body);
  const updatedBookmark = await database.updateBookmark(bookmark);
  res.json(updatedBookmark);
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await database.deleteBookmark(req.params.id);
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
