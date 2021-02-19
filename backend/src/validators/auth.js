const { check, validationResult } = require('express-validator');

//Validator for SIGN UP
exports.validateSignUpRequest = [
    check('firstName').notEmpty().withMessage('First name is required'),
    check('lastName').notEmpty().withMessage('Last name is required'),
    check('email').isEmail().withMessage('Email is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

//Validator for SIGN IN
exports.validateSignInRequest = [
    check('email').isEmail().withMessage('Email is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];


//middleware, need to add next(), dont forget it !
exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({ error: errors.array()[0].msg })
    };
    next();
}