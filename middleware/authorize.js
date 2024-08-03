const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
    // Get token from header
    const token = req.header("authorization");
    if (!token) {
        res.status(401).json({ error: 'Authorization token missing' });
        return;
    }
    try {
        const { userId, exp } = await jwt.verify(token, process.env.JWT_SECRET);
            // Check if token has expired
            if (exp < Date.now().valueOf() / 1000) {
                return res.status(401).json({
                    error: "JWT token has expired, please login to obtain a new one"
                });
            } else {
                req.employeeId = employeeId;
                next();
            }
        } catch (error) {
            next(error);
        }
    };
    
    module.exports = authenticate;