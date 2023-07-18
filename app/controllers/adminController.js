const Change = require("../models/Change");
const User = require("../models/User");
const Word = require("../models/Word");


// get changes details
const getChangesDetails = async (type) => {
    try {
      const data = await Change.find({ type: type });
      
      for (let index = 0; index < data.length; index++) {
         const contributor = await User.findOne({ _id: data[index].user_id });
         data[index].user_details = contributor;
      }
      
      return data;
    } catch (error) {
      console.log("@error", error);
    }
  };

// reject contribution
const rejectContributionNewMeaning = async (req, res) => {
  try {
    // req.params.key for => find word
    // req.params._id for => find word meaning
    // req.params.for_change for => access change collection
    // req.params.user_id for access user details
    
    // remove contribution from word meanings array
    await  Word.findByIdAndUpdate(req.params.key, { $pull: { meanings: { _id: req.params._id } } })
    // remove change in change details
    await Change.findByIdAndDelete(req.params.for_change)

    // if there is user
      if(req.params.user_id !== "no_user"){
      // decrease user contribution count
      const updatedWord = await Word.findOneAndUpdate(
        {
          _id: req.params.key,
          'contributers.user_id': req.params.user_id
        },
        { $inc: { 'contributers.$.count': -1 } },
        { new: true }
      );
      

      // remove contributer if count === 0
      const contributor = updatedWord.contributers.find(contributor => contributor.user_id === req.params.user_id);
      if (contributor.count === 0) {
        updatedWord.contributers.pull({ user_id: req.params.user_id })
      }
      await updatedWord.save()

      // change approval status for user
      const updateUser = await User.findOneAndUpdate(
        {
          _id: req.params.user_id,
          'contributions.key': req.params._id
        },
        { $set: { 'contributions.$.approved': false } },
        { new: true }
      );

      await updateUser.save();

    }


  
    res.redirect("/admin/new-meanings")
  } catch (error) {
    console.error(error);
  }
};

// contribution ok
// if contribution ok remove it details from db
const contributionOk = async (req, res) => {
  // req.params._id for access change collection
  // remove it from db
  await Change.findByIdAndDelete(req.params._id)
  res.redirect("/admin/new-meanings")
}

// set contributer to word function
const setContributer = async (userInfo, foundedWord)  => {
  if (userInfo.status === true) {
    // add this user to contributers list if not already contributer with count => 1
    // if user already contributor increse contribution count
    const isUserFound = foundedWord.contributers.some(contributor => contributor.user_id === userInfo.data.id)

    if (!isUserFound) {
      foundedWord.contributers.push({user_id:userInfo.data.id, count: 1});
    }else{
     await Word.findOneAndUpdate(
        { 'contributers.user_id': userInfo.data.id },
        { $inc: { 'contributers.$.count': 1 } },
        { new: true }
      )
    }
  }
}

// add change details to db
const addChangeDetails = async (main_word, type, key, changed_data, old_data, user_logged, user_id) => {
  const changeData = new Change({
    main_word: main_word,
    type: type,
    key: key,
    changed_data: changed_data,
    old_data: old_data,
    user_logged: user_logged,
    user_id: user_id
  })

  await changeData.save();
}

module.exports = { getChangesDetails, rejectContributionNewMeaning, contributionOk, setContributer, addChangeDetails }