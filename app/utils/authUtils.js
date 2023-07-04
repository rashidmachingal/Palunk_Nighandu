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
                res.redirect("/account/login")
            } else {
                console.log("@auth_success")
                next()
            }
        });
    }else{
        res.redirect("/account/login")
        console.log("@auth_failed")
    }

}


module.exports = { createJwtToken, verifyToken }