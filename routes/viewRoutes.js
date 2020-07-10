const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewsController.getHome);

router.get('/createNewArticle', viewsController.createArticle);
router.get('/article/:slug', viewsController.getArticle);
router.get('/:id/editArticle', viewsController.editArticle);
router.get('/login', viewsController.getLoginForm);

router.get('/signup', viewsController.getSignupForm);

module.exports = router;
