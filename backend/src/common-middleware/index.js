const jwt = require('jsonwebtoken');

//Need SIGNIN ...
exports.requireSignIn = (req, res, next) => {
    
    if (!req.headers.authorization) {
        return res.status(400).json({ message: 'Authorization required' });
    }
    
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
}

//ONLY ADMIN can ...
exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(400).json({ message: 'Access denied !'});
    }
    next();
}