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

module.exports = { getWordMeaning }