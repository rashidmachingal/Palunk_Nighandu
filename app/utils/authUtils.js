const jwt = require("jsonwebtoken");

// create jwt token
const createJwtToken = (user_name, id) => {
    const token = jwt.sign({user_name, id}, process.env.PASS_SEC);
    return token
}

// verify token
const verifyToken = (req, res, next) => {
    const token = req.cookies.Token

    if(token){
        jwt.verify(token, process.env.PASS_SEC, (error, decodedToken) => {
            if (error) {
                console.log("@failed")
                next()
            } else {
                console.log("@success")
                next()
            }
        });
    }

}


module.exports = { createJwtToken, verifyToken }