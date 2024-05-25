const Photo = require('../models/Photo');

exports.about = (req, res) => {
  res.render('about');
};

exports.add = (req, res) => {
  res.render('add');
};

exports.edit = async (req, res) => {
  const photo = await Photo.findOne({ _id: req?.params?.id });
  res.render('edit', {
    photo
  });
};