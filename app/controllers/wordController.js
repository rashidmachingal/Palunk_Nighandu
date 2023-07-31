const Change = require("../models/Change");
const Word = require("../models/Word");
const User = require("../models/User");
const { setContributer, addChangeDetails } = require("./adminController");
const { addContributionDetails } = require("./userController");

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

    // for word
    // if user logged in set contributer
    await setContributer(userInfo, foundedWord)   

    // save the updated word to the database
    const newSavedData = await foundedWord.save();
    res.status(200).json({ message: 'meaning added successfully' });

    const changesData = newSavedData.meanings.pop()

    // create unique id
    const uniqueID = Date.now();

    // for admin
    // add the new meaning to changes
    await addChangeDetails(english_word,"new_meaning",foundedWord._id, changesData, {}, userInfo.status, userInfo?.data?.id, uniqueID)

    // for user
    // add to newMeaning contribution details
    await addContributionDetails({ main_word: english_word, type: "new_meaning", changed_data: req.body, key: uniqueID, approved: true}, userInfo)
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error occurred while adding the meaning' });
  }
};



// edit word meaning in exsting word
const editWordMeaning = async (req, res, userInfo) => {
  try {
    const { wordId } = req.params

    // find the word in the database
    const foundedWord = await Word.findOne({_id: wordId});

    // get old data
    const oldData = await Word.findOne(
      { _id: wordId },
      { meanings: { $elemMatch: { _id: req.body._id } } }
    );

    // edit word meanigs
    const updatedWord = await Word.findOneAndUpdate(
      { _id: wordId, 'meanings._id': req.body._id },
      { $set: { 'meanings.$': req.body } },
      { new: true }
      
    )
    res.status(200).json({ message: "word meaning edited successfully", updatedWord })


    // for word
    // if user logged in set contributer
    await setContributer(userInfo, foundedWord)
    await foundedWord.save()

    // create unique id
    const uniqueID = Date.now();

    // for admin
    // add the edit to changes
    await addChangeDetails(foundedWord.english_word,"edit",foundedWord._id, req.body, oldData.meanings[0], userInfo.status, userInfo?.data?.id, uniqueID)

    // for user
    // add edit contribution details to user profile
    await addContributionDetails({main_word: foundedWord.english_word,type: "edit",changed_data: req.body,old_data: oldData.meanings[0],key: uniqueID, approved: true}, userInfo)


  } catch (error) {
   console.log("@error", error)
  }
};



module.exports = { getWordMeaning, addNewWord, addMeaningToWord, editWordMeaning }