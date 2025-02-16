"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const express = require('express');
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
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
