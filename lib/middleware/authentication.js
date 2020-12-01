const jwt = require('jsonwebtoken');
//const JWT_KEY = "secret";

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[2];
        console.log(token);
        console.log(JWT_KEY);
        const decrypted = jwt.verify(token, JWT_KEY)
        console.log(decrypted.foo);
        req.userData = decrypted;
        console.log("success!");
        next();
    } catch (error){
        return res.status(401).json({
            message: 'Auth failed'
        });
    }

};