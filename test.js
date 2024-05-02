/* const mongoose = require('mongoose');
const Schema = mongoose.Schema; */

// connect db
/* mongoose.connect('mongodb://localhost/pcat-test-db'); */

// create schema
/* const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema); */

// create a photo
/* Photo.create({
  title: 'Photo 1',
  description: 'Photo lorem 1'
}); */

/* Photo.find({}).then(result => {
  console.log(result);
}); */

/* Photo.findByIdAndUpdate('6632584bec4d46b337453d86', {
  title: 'Photo 1 updated',
  description: 'Photo lorem 1 updated'
}).then(updatedDocument => {
  console.log(updatedDocument);
}); */

/* Photo.findByIdAndDelete('6632584bec4d46b337453d86')
  .then(deletedDocument => {
    if (deletedDocument) {
      console.log('Belge silindi.', deletedDocument);
    } else {
      console.log('Belge bulunamadı.');
    }
  }).catch(error => {
    console.log('Hata:', error);
  }); */