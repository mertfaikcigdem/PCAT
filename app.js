const express = require('express');
const ejs = require('ejs');
const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override', {
  methods: ['POST', 'GET']
});
const photoControllers = require('./controllers/photoControllers');
const pageControllers = require('./controllers/pageControllers');

// connect db
mongoose.connect('mongodb://localhost/pcat-test-db');

// template engine
app.set('view engine', 'ejs');

// middlewares
/* const myLogger = (req, res, next) => {
  console.log('myLogger is started.');
  next();
}; 
app.use(myLogger);*/
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method'));

// routes
app.get('/', photoControllers.getAllPhotos);

app.get('/about', pageControllers.about);
app.get('/add', pageControllers.add);
app.get('/photo/:id', photoControllers.getPhoto);
app.get('/post/:id', async (req, res) => {
  const post = await Photo.findById(req?.params?.id);
  res.render('post', {
    post
  });
});
app.post('/photos', photoControllers.createPhoto);

app.get('/photos/edit/:id', pageControllers.edit);

app.put('/photo/:id', photoControllers.updatePhoto);

app.delete('/photo/:id', photoControllers.deletePhoto);


app.listen(port, () => {
  console.log(`Ready on localhost:${port}`);
});