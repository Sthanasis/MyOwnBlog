const Article = require('../models/articleModel');
const User = require('../models/userModel');
const catchAsync = require('../utilities/catchAsync');

exports.getHome = catchAsync(async (req, res, next) => {
  //1) GET all articles from collection
  const articles = await Article.find();
  //sort from newest to oldest
  articles.reverse();
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

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Create Account To MyBlog',
  });
};

exports.createArticle = (req, res) => {
  res.status(200).render('createNewArticle', {
    title: 'Share your thoughts',
  });
};

exports.postSignupForm = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      newUser,
    },
  });
});
