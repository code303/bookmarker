const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const bookmarksRouter = require('./api/bookmarks');

// Serve static files from the "static" directory
app.use(express.static(path.join(__dirname, 'static')));

app.use('/api/bookmarks', bookmarksRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
