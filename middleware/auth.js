const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: "fail",
            data: null,
            message: "Token is required for authentication"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                status: "fail",
                data: null,
                message: "Invalid token"
            });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
