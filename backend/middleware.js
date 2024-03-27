const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("./config")


function authMiddleware(req,res,next) {
    const authHeader = req.headers.authorization
    if(!authHeader) {
        return res.status(403).json({})
    }

    const token = authHeader;

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;
        next();
    } catch(err) {
        console.log(err);
        return res.status(403).json({msg: "error"});
    }

};

module.exports = {
    authMiddleware
}