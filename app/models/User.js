const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    user_name: {type: String},
    email: { type: String },
    password: {type: String},
    admin: {type: Boolean, default: false},
    edits: {type: Array},
    newMeanings: {type: Array},
    newWords: {type: Array}
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);