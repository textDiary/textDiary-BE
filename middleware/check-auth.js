const jwt = require('jsonwebtoken');
JWT_SECRET_KEY = 'testing'

module.exports = (req, res, next) => {
    try {
        console.log('header', req.headers.authorization);
        const token = req.headers.authorization.split(' ')[1];
        // console.log(token);
        const decodedToken = jwt.verify(token , JWT_SECRET_KEY);
        req.userData = { mailId: decodedToken.mailId, id: decodedToken.id }
        console.log(req.userData);
        next();
    } catch (error) {

        console.log(error);
        res.status(401).json({
            message: 'Auth Failed!',
            error
        });
    }
}