const express = require('express');
const ejs = require('ejs');
const app = express();
const port = 3000;
const path = require('path');

app.set('view engine', 'ejs');

const myLogger = (req, res, next) => {
  console.log('myLogger is started.');
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
  /* res.sendFile(path.resolve(__dirname, 'temp/index.html')); */
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});
app.get('/video-page', (req, res) => {
  res.render('video-page');
});

app.listen(port, () => {
  console.log(`Ready on localhost:${port}`);
});