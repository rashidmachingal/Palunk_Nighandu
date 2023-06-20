const Word = require("../models/Word");

// get single word meaning
const getWordMeaning = async (english_word) => {
    try {
      // find the word in the database
      const foundedWord = await Word.findOne({ english_word });
  
      // return error messsage if wor not found
      if (!foundedWord || !foundedWord.status) return { status: false, english_word }
  
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
    console.log(english_word,"@english_word")
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

module.exports = { getWordMeaning, addNewWord }