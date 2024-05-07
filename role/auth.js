const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ error: true, message: "Access Denied. No token Provided" });
    }

    try {
        const tokenDetails = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = tokenDetails;
        next();
    } catch (error) {
        res.status(403).json({ error: true, message: "Access Denied. Invalid token" });

    }
}

module.exports = auth