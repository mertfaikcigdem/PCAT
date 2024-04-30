const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const myLogger = (req, res, next) => {
  console.log('object');
  next();
};
app.use(express.static('public'));
app.use(myLogger);

app.get('/', (req, res) => {
  /* const photo = {
    id: 1,
    name: "Blog Title",
    description: "Blog description"
  };
  res.send(photo); */
  res.sendFile(path.resolve(__dirname, 'temp/index.html'));
});

app.listen(port, () => {
  console.log(`Ready on localhost:${port}`);
});