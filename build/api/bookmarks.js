"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../database/database"));
const router = express_1.default.Router();
const database = database_1.default.getInstance();
// routes for bookmarks
router.get('/', (req, res) => {
    const bookmarks = database.getBookmarks();
    res.send(bookmarks);
});
router.get('/:id', (req, res) => {
    const bookmark = database.getBookmark(req.params.id);
    res.send(bookmark);
});
router.post('/', (req, res) => {
    const result = database.addBookmark(req.params.id);
    res.send('Add a new bookmark');
});
router.put('/:id', (req, res) => {
    res.send(`Update bookmark with id ${req.params.id}`);
});
router.delete('/:id', (req, res) => {
    res.send(`Delete bookmark with id ${req.params.id}`);
});
module.exports = router;
