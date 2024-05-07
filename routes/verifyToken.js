const jwt = require('jsonwebtoken')

exports.cookieJwtAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        // console.log("Unauthorize, No token is found");
        return res.status(401).json({ message: "Unauthorize" });
    }

    try {
        const verify = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.verify = verify;
        next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};