const express = require('express');
const router = express.Router();
const { signup, signin, requireSignIn } = require('../controllers/auth');


router.post('/signin', signin);

router.post('/signup', signup);

router.post('/profile', requireSignIn, (req, res) => {
    return res.status(200).json({ user: 'profile' });
})

module.exports = router;