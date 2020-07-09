const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn)

router.get('/', viewsController.getHome);
router.get('/article/:slug', viewsController.getArticle);
router.get('/login', viewsController.getLoginForm);
router.get('/signup', viewsController.getSignupForm);
router.post('/signup', viewsController.postSignupForm);

module.exports = router;
