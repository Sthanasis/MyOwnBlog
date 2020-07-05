const Article = require('../models/articleModel');
const catchAsync = require('../utilities/catchAsync');

exports.getAllArticles = catchAsync(async (req, res) => {
  const articles = await Article.find();
  res.status(200).json({
    status: 'success',
    data: {
      articles,
    },
  });
});

exports.getArticle = catchAsync(async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      article,
    },
  });
});

exports.createArticle = catchAsync(async (req, res) => {
  const newArticle = await Article.create(req.body);
  console.log(newArticle);
  res.status(201).json({
    status: 'success',
    data: {
      newArticle,
    },
  });
});

exports.updateArticle = catchAsync(async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
    new: true, //send the new obj
    runValidators: true, // validates if new data types are consistent with model's data types
  });
  res.status(200).json({
    status: 'success',
    data: {
      article,
    },
  });
});

exports.deleteArticle = catchAsync(async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
