const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {
  const currentPage = req?.query?.page || 1;
  const limit = 2;
  const photosCount = await Photo.find().countDocuments();
  const photos = await Photo.find({})
  .sort('-createdDate')
  .skip((currentPage - 1) * limit)
  .limit(limit);
  res.render('index', {
    photos,
    currentPage,
    pages: Math.ceil(photosCount / limit),
    nextPage: Number(currentPage) + 1,
  });
};

exports.getPhoto = async (req, res) => {
  const photo = await Photo.findById(req?.params?.id);
  res.render('photo', {
    photo
  });
};

exports.createPhoto = async (req, res) => {
  const uploadDir = 'public/uploads';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadedImage = req?.files?.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadedImage?.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage?.name,
    });
  })
  res.redirect('/');
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req?.params?.id });
  photo.title = req?.body?.title;
  photo.description = req?.body?.description;
  photo.save();
  res.redirect(`/photo/${req?.params?.id}`);
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req?.params?.id });
  let deletedImage = __dirname + '/../public' + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndDelete(req?.params?.id);
  res.redirect('/');
};