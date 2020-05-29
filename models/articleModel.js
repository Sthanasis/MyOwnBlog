const mongoose = require('mongoose');
const User = require('./userModel');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'An article must have a title'],
  },
  content: {
    type: String,
    required: [true, 'An article must have a content'],
  },
  date: {
    type: String,
    default: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
  },
  author: {
    type: String,
    default: User.name,
  },
  image: {
    type: String,
    default: User.image,
  },
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
