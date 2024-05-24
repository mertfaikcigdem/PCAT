const express = require('express');
const ejs = require('ejs');
const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');

// models
const Photo = require('./models/Photo');

// connect db
mongoose.connect('mongodb://localhost/pcat-test-db');

app.set('view engine', 'ejs');

const myLogger = (req, res, next) => {
  console.log('myLogger is started.');
  next();
};
app.use(express.static('public'));
app.use(myLogger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index', {
    photos,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});
app.get('/photo/:id', async (req, res) => {
  const photo = await Photo.findById(req?.params?.id);
  res.render('photo', {
    photo
  });
});
app.get('/post/:id', async (req, res) => {
  const post = await Photo.findById(req?.params?.id);
  res.render('post', {
    post
  });
});
app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Ready on localhost:${port}`);
});