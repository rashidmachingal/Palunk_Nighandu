const User = require("../models/User")


// get user contribution detaiils
const getUserContributions = async (userId) => {
    try {
        const userContributions = await User.findOne({_id:userId}).select("-_id contributions")
        return userContributions
    } catch (error) {
     console.log("@error", error)   
    }
}

module.exports = { getUserContributions }