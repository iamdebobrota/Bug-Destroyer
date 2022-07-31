const TodoModel = require("../models/TodoSchema");

const getTodos = async (req, res) => {
  try {
    let userId = req.user_data._id;
    let todos = await TodoModel.find(userId);
    return res.status(200).send({ type: "success", data: todos });
  } catch (e) {
    return res
      .status(500)
      .json({ type: "error", message: "Internal Error Occured" });
  }
};

const createTodo = async (req, res) => {
  let userId = req.user_data._id;
  let payload = {
    ...req.body,
    userId,
  };
  try {
    let todo = await new TodoModel(payload);
    todo.save((err, success) => {
      if (err) {
        return res
          .status(500)
          .send({ type: "error", message: "something went wrong" });
      }
      return res
        .status(201)
        .send({ type: "success", message: "Todo Created Successfully" });
    });
  } catch (e) {
    return res
      .status(500)
      .json({ type: "error", message: "Internal Error Occured" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const _id = req.params.id;
    const uddate_Todo = await TodoModel.findByIdAndUpdate(_id, req.body);
    await uddate_Todo.save();
    return res.send({ type: "success", message: "Todo updated successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ type: "error", message: "Internal Error Occured" });
  }
};
const deleteTodo = async (req, res) => {
  try {
    const _id = req.params.id;
    const delete_Todo = await TodoModel.findByIdAndUpdate(_id, {
      delete: true,
    });
    await delete_Todo.save();
    return res.send({ type: "success", message: "Todo deleted successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ type: "error", message: "Internal Error Occured" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const _id = req.params.id;
    const update_Status = await TodoModel.findByIdAndUpdate(_id, req.body);
    await update_Status.save();
    return res.send({
      type: "success",
      message: "Todo status updated successfully!",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ type: "error", message: "Internal Error Occured" });
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo, updateStatus };
