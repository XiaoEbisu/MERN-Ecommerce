const express = require('express');
const { addItemToCart } = require('../controllers/cart');
const { requireSignIn, userMiddleware } = require('../common-middleware');
const router = express.Router();

router.post('/user/cart/add-to-cart', requireSignIn, userMiddleware, addItemToCart);


module.exports = router;