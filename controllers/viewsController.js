const Article = require('../models/articleModel');
const catchAsync = require('../utilities/catchAsync');

exports.getHome = catchAsync(async (req, res, next) => {
  // GET all articles from collection
  const articles = await Article.find();
  //sort from newest to oldest
  articles.reverse();

  // render template using article data
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

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Create Account To MyBlog',
  });
};

exports.createArticle = (req, res) => {
  res.status(200).render('createNewArticle', {
    title: 'Share Your Thoughts',
  });
};

exports.editArticle = catchAsync(async (req, res) => {
  const article = await Article.findById({ _id: req.params.id });

  res.status(200).render('editArticle', {
    title: 'Edit Your Article',
    article,
  });
});
