const Change = require("../models/Change");
const Word = require("../models/Word");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");

// get single word meaning
const getWordMeaning = async (english_word) => {
    try {
      // find the word in the database
      const foundedWord = await Word.findOne({ english_word });
  
      // return error messsage if wor not found
      if (!foundedWord || !foundedWord.status) return { status: false, english_word }

      // find contributers using id
      const contributorIds = foundedWord.contributers.map(contributor => contributor.user_id);
      const contributers = await User.find({ _id: { $in: contributorIds } }).select("_id user_name profile_picture social_media");
      foundedWord.contributersList = contributers;

      // return word meanings
      return foundedWord
    } catch (error) {
      console.log("@error",error)
    }
};

// add new word to database
const addNewWord = async (req, res) => {
  try {
    const { english_word, meanings } = req.body;
    // if the word already exists sent error message
    const existingWord = await Word.findOne({ english_word });
    if (existingWord) return res.status(400).json({ message: 'word already exists' });

    // create a new word instance using the Word model
    const newWord = new Word({
      english_word,
      meanings
    });

    // save the new word to the database and sent success message
    const addedWord =  await newWord.save();
    res.status(201).json({ message: 'word added successfully', word: addedWord });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error occurred while adding the word' });
  }
};

// add a new meaning to an existing word
const addMeaningToWord = async (req, res, userInfo) => {
  try {
    const { english_word } = req.params;

    // find the word in the database
    const foundedWord = await Word.findOne({ english_word });

    if (!foundedWord) {
      return res.status(404).json({ message: 'word not found' });
    }

    // add the new meaning to the word's meanings array
    foundedWord.meanings.push(req.body);
    // if user logged in set contributer
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

    // save the updated word to the database
    const newSavedData = await foundedWord.save();
    res.status(200).json({ message: 'meaning added successfully' });

    // for admin
    // add the new meaning to changes
    const changeData = new Change({
      main_word: english_word,
      type: "new_meaning",
      key: foundedWord._id,
      changed_data: newSavedData.meanings.pop(),
      user_logged: userInfo.status,
      user_id: userInfo?.data?.id
    })


    const changedData =  await changeData.save();

    // for user
    // add to newMeaning contribution details
    const contributionData = {
       main_word: english_word,
       type: "new_meaning",
       changed_data: req.body,
    }

    if(userInfo.status === true){
        const user = await User.findOne({_id:userInfo.data.id})
        user.newMeanings.push(contributionData)
        const updatedData = await user.save()
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error occurred while adding the meaning' });
  }
};

// edit word meaning in exsting word
const editWordMeaning = async (req, res) => {
  try {
    const { wordId } = req.params

    Word.findOneAndUpdate(
      { _id: wordId, 'meanings._id': req.body._id },
      { $set: { 'meanings.$': req.body } },
      { new: true }
      
    ).then((updatedWord) => {
      res.status(200).json({ message: "word meaning edited successfully", updatedWord })
    }).catch((error) => {
      res.status(500).json(error)
    })

  } catch (error) {
    res.status(500).json({ message: 'error occurred while edit word meaning/part_of_speech' });
  }
};

// contribution ok
// if contribution ok remove it details from db
const contributionOk = async (req, res) => {
  // remove it from db
  // req.params._id for access change collection
  await Change.findByIdAndDelete(req.params._id)
  res.redirect("/admin/new-meanings")
}

// reject contribution
const rejectContribution = async (req, res) => {
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
      if(!req.params.user_id === "no_user"){
      // decrease user contribution count
      const updatedWord = await Word.findOneAndUpdate(
         { 'contributers.user_id': req.params.user_id },
         { $inc: { 'contributers.$.count': -1 } },
         { new: true }
      )

      // remove contributer if count === 0
      const contributor = updatedWord.contributers.find(contributor => contributor.user_id === req.params.user_id);
      if (contributor.count === 0) updatedWord.contributers.pull({ user_id: req.params.user_id })
      await updatedWord.save()
    }
  
    res.redirect("/admin/new-meanings")
  } catch (error) {
    console.error(error);
  }
};


module.exports = { getWordMeaning, addNewWord, addMeaningToWord, editWordMeaning, contributionOk, rejectContribution }