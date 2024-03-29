const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema(
  {
    english_word : {type: String},
    status: {type: Boolean, default: true},
    meanings: [{ definition: {type: String}, part_of_speech: {type: String}, id: {type:  mongoose.Schema.Types.ObjectId}}],
    contributers : [{user_id:{type: String}, count: {type: Number}}],
    contributersList: {type: Array}
  },
  {timestamps: true}
);

module.exports = mongoose.model("Word", WordSchema);