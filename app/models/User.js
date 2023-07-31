const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    user_name: { type: String },
    email: { type: String },
    password: { type: String },
    admin: { type: Boolean, default: false },
    profile_picture: { type: String },
    social_media: { type: String },
    contributions: [
      {
        main_word: { type: String },
        type: { type: String },
        changed_data: { type: Object },
        old_data: {type : Object},
        key: { type: Number },
        approved: {type: Boolean}
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);