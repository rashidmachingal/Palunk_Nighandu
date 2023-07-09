const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createJwtToken } = require("../utils/authUtils");

// register a new user
const registerUser = async (req, res) => {
    // data from client
    const { user_name, email, password, profile_picture } = req.body;

  try {
    // sent message if user already registered with email
    const isAlreadyUser = await User.findOne({ email: email });
    if (isAlreadyUser) return { status: false, message: "this email already registered" }

    // hash the password using bcrypt
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    // create a new user
    const newUser = new User({
        user_name,
        email,
        password: hashedPassword,
        profile_picture
      });

    // Save the user to the database
    const savedUser = await newUser.save();

    // create jwt token
    const token = createJwtToken(user_name, savedUser._id)

    // send jwt token and register status message
    return {profile_picture: savedUser.profile_picture, token, status: true}
    
  } catch (error) {
    console.log("@error",error)
    return { status: false, message: "something went wrong" }
  }
};

// user login
const loginUser = async (req, res) => {
    // data from client
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
  
      // Check if the user exists and sent message
      if (!user) {
        return  { status: false, message: "invalid email or password" }
      }
  
      // Compare the provided password with the hashed password stored in the database
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return { status: false,  message: 'invalid email or password' }
      }
  
    // create jwt token
    const token = createJwtToken(user.user_name, user._id)

    // send jwt token and login status message
    return {profile_picture: user.profile_picture ,token, status: true}

    } catch (error) {
        console.log("@error",error)
        return { status: false, message: "something went wrong" }
    }
  };
  

module.exports = { registerUser, loginUser };