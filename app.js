const express = require('express');
const ejs = require('ejs');
const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const methodOverride = require('method-override');

// models
const Photo = require('./models/Photo');

// connect db
mongoose.connect('mongodb://localhost/pcat-test-db');

// template engine
app.set('view engine', 'ejs');

// middlewares
const myLogger = (req, res, next) => {
  console.log('myLogger is started.');
  next();
};
app.use(express.static('public'));
app.use(myLogger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method'));

// routes
app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-createdDate');
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
  const uploadDir = 'public/uploads';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadedImage = req?.files?.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadedImage?.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage?.name,
    });
  })
  res.redirect('/');
});

app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req?.params?.id });
  res.render('edit', {
    photo
  });
});

app.put('/photo/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req?.params?.id });
  console.log(req);
  photo.title = req?.body?.title;
  photo.description = req?.body?.description;
  photo.save();
  res.redirect(`/photo/${req?.params?.id}`);
});


app.listen(port, () => {
  console.log(`Ready on localhost:${port}`);
});