const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.getHome);
router.get('/article/:slug', viewsController.getArticle);
router.get('/login', viewsController.getLoginForm);

module.exports = router;
