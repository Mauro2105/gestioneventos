const jwt = require('jsonwebtoken');

const validate = (req, res, next) => {
    let token;

    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = { id: decoded.id };
            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
        }    
    } else {
        res.status(401).json({ message: 'No token, authorization denied' });
    }
};

module.exports = {validate};