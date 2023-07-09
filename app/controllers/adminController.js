const Change = require("../models/Change");
const User = require("../models/User");


// get changes details => new meanings added to exsting english word
const getNewMeanings = async () => {
    try {
      const data = await Change.find({ type: "new_meaning" });
      
      for (let index = 0; index < data.length; index++) {
         const contributor = await User.findOne({ _id: data[index].user_id });
         data[index].user_details = contributor;
      }
      
      return data;
    } catch (error) {
      console.log("@error", error);
    }
  };

module.exports = { getNewMeanings }