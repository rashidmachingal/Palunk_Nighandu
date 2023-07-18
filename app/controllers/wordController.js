const Change = require("../models/Change");
const Word = require("../models/Word");
const User = require("../models/User");

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
       key: changedData.changed_data[0]._id,
       approved: true
    }

    if(userInfo.status === true){
        const user = await User.findOne({_id:userInfo.data.id})
        user.contributions.push(contributionData)
        const updatedData = await user.save()
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error occurred while adding the meaning' });
  }
};



// edit word meaning in exsting word
const editWordMeaning = async (req, res, userInfo) => {
  try {
    const { wordId } = req.params

    const updatedWord = await Word.findOneAndUpdate(
      { _id: wordId, 'meanings._id': req.body._id },
      { $set: { 'meanings.$': req.body } },
      { new: true }
      
    )

    res.status(200).json({ message: "word meaning edited successfully", updatedWord })

    // for admin
    // add the edit to changes
    const changeData = new Change({
      main_word: updatedWord.english_word,
      type: "edit",
      key: updatedWord._id,
      changed_data: req.body,
      user_logged: userInfo.status,
      user_id: userInfo?.data?.id
    })

    const changedData =  await changeData.save();

  } catch (error) {
    res.status(500).json({ message: 'error occurred while edit word meaning/part_of_speech' });
  }
};



module.exports = { getWordMeaning, addNewWord, addMeaningToWord, editWordMeaning }