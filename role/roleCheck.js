const roleCheck = (role) => {
    return (req, res, next) => {
        const userRole = req.user.role;

        if (!userRole) {
            console.log("User role not defined");
            return res.status(403).json({ error: true, message: "Access Denied. User role not defined" });
        }

        const userRoleString = Array.isArray(userRole) ? userRole[0] : userRole;

        if (role === userRoleString) {
            next(); 
        } else {
            res.status(403).json({ error: true, message: "Not authorized" });
        }
    };
};

module.exports = roleCheck;