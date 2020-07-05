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

exports.getArticle = (req, res) => {
  res.status(200).render('article', {
    title: 'My first Article',
  });
};
