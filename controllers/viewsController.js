const Article = require('../models/articleModel');
const catchAsync = require('../utilities/catchAsync');

exports.getHome = catchAsync(async (req, res, next) => {
  //1) GET all articles from collection
  const articles = await Article.find();

  //2) build template

  //3) render template using article data from step 1
  res.status(200).render('home', {
    title: 'All Articles',
    articles,
  });
});

exports.getArticle = catchAsync(async (req, res, next) => {
  const article = await Article.findOne({ slug: req.params.slug });

  res.status(200).render('article', { article });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('loginScreen', {
    title: 'Log into your account',
  });
};
