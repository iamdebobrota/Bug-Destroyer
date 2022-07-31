const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  comment: String,
  user_id: { type: Schema.Types.ObjectId },
  issue_id: { type: Schema.Types.ObjectId },
});

const CommentModel = model("comment", commentSchema);

module.exports = { CommentModel };
