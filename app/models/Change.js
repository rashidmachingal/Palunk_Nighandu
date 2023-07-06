const mongoose = require("mongoose");

const ChangeSchema = new mongoose.Schema(
  {
    main_word: {type: String},
    type: {type: String},
    key: {type: String},
    changed_data: {type: Array},
    user_logged: {type: Boolean},
    user_id: {type: String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Change", ChangeSchema);