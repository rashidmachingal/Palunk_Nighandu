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

// add contribution details to db
const addContributionDetails = async (contributionData, userInfo) => {
    if(userInfo.status === true){
        const user = await User.findOne({_id:userInfo.data.id})
        user.contributions.push(contributionData)
       await user.save()
    }
}

module.exports = { getUserContributions, addContributionDetails }