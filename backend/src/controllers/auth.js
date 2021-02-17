const User = require('../models/user');
const shortid = require('shortid');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if (user) return res.status(400).json({
            message: 'Email already registered'
        });

        const {
            firstName, 
            lastName, 
            email, 
            password
        } = req.body;

        const _user = new User({
            firstName, 
            lastName, 
            email, 
            password, 
            username: shortid.generate()
        });
    
        _user.save((error, data) => {
            if (error) {
                console.log(error);
                return res.status(400).json({
                    message: 'Something went wrong'
                });
            }

            if (data) {
                return res.status(201).json({
                    message: 'User created successfully..!'
                });
            }
        });
        
    });
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if (error) return res.status(400).json({ error });
        if (user) {
            
            if (user.authenticate(req.body.password)) {
                const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
                const { _id, firstName, lastName, email, role, fullname } = user;
                
                res.status(200).json({
                    token, 
                    user: { _id, firstName, lastName, email, role, fullname }
                });

            } else {
                return res.status(400).json({
                    message: 'Invalid password'
                });
            }

        } else {
            return res.status(400).json({
                message: 'Email not existed'
            })
        } 
    });
}