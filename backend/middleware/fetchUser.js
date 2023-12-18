const jwt = require('jsonwebtoken');


const fetchUser = (req, res, next) => {
    //Get user from jwt token and add if to req object
    const token = req.header('auth-token');
    if (!token) {
        res.send(401).send({ error: "Please authenticate using valid token" })
    }
    try {
        const data = jwt.verify(token, process.env.SECRET);
        req.user = data.user;
        next()
    } catch (error) {
        res.send(401).send({ error: "Please authenticate using valid token" })
    }
  
}

module.exports = fetchUser

