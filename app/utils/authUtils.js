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
                console.log("@auth_failed")
            } else {
                console.log("@auth_success")
                next()
            }
        });
    }else{
        console.log("@auth_failed")
    }

}


module.exports = { createJwtToken, verifyToken }