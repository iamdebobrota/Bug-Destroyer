const mongoose = require("mongoose");
const { all } = require("../routes/auth.routes");

const todoSchema = mongoose.Schema({
  title: { type: String, require: true },
  Description: { type: String, require: true },
  delete: { type: Boolean, default: false },
  userId: { type: String, require: true },
  status: {
    type: Object,
    default: { inPogress: false, todo: true, done: false },
  },
});

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = TodoModel;
