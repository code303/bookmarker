import express from 'express';
const path = require('path');
const app = express();
const PORT = 3000;

const bookmarksRouter = require('./api/bookmarks');

app.use(express.static(path.join(__dirname, 'static')));

app.use('/api/bookmarks', bookmarksRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
