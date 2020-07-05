const mongoose = require('mongoose');
const slugify = require('slugify');
const User = require('./userModel');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'An article must have a title'],
  },
  slug: String,
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

articleSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
