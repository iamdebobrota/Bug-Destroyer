const { Schema, model } = require("mongoose");

const issueSchema = new Schema({
  title: String,
  desc: String,
  img: String,
  code: String,
  user_id: [{ type: Schema.Types.ObjectId, ref: "user" }],
  deleted: Boolean,
  comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
});

const IssueModel = model("issue", issueSchema);

module.exports = { IssueModel };
