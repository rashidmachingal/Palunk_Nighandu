const jwt = require("jsonwebtoken");

// create jwt token
const createJwtToken = (user_name, id, isAdmin) => {
    const token = jwt.sign({user_name, id, isAdmin}, process.env.JWT_SEC);
    return token
}

// verify user token & if user not logged in redirect to login page
const authVerfication = (req, res, next) => {
    const token = req.cookies.Token

    if(token){
        jwt.verify(token, process.env.JWT_SEC, (error, decodedToken) => {
            if (error) {
                res.redirect("/account/login")
            } else {
                next()
            }
        });
    }else{
        res.redirect("/account/login")
    }

}

// verify admin 
const adminVerfication = (req, res, next) => {
  const token = req.cookies.Token

  if(token){
      jwt.verify(token, process.env.JWT_SEC, (error, decodedToken) => {
          if (error) {
              res.redirect("/account/login")
          } else {
            if(decodedToken.isAdmin){
              next()
            }else{
              res.redirect("/account/login")
            }
          }
      });
  }else{
      res.redirect("/account/login")
  }

}

// verify user token & and sent user logged or not info with user data
const getUser = async (req) => {
    const token = req.cookies.Token;
  
    if (token) {
      try {
        const decodedToken = await jwt.verify(token, process.env.JWT_SEC);
        return { status: true, data:decodedToken };
      } catch (error) {
        return { status: false };
      }
    } else {
      return { status: false };
    }
  };
  


module.exports = { createJwtToken, authVerfication, getUser, adminVerfication }