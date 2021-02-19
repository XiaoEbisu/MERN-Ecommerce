const express = require('express');
const { requireSignIn, adminMiddleware } = require('../common-middleware');
const { addCategory, getCategory } = require('../controllers/category');
const router = express.Router();

router.post('/category/create', requireSignIn, adminMiddleware, addCategory);

router.get('/category/all', getCategory);

module.exports = router;