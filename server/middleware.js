const jwt = require('jsonwebtoken');

const JWT_SECRET = "jwt_secret_password";

module.exports = (req, res, next) => {
    // check header or url parameters or post parameters for token
    var token = req.body.token;
    // decode token and  verifies secret and checks exp
    if (token) {
        jwt.verify(token, JWT_SECRET, function (err, decoded) {
            if (err) {
                return res.status(403).send({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token, return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
};