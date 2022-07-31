const { Router } = require("express");
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  updateStatus,
} = require("../controllers/todos.controller");
const { requireLogin } = require("../middleware/requireLogin.middleware");

const todoRouter = Router();

//getting Users Todos
todoRouter.get("/all-todos", requireLogin, getTodos);

//post Todos
todoRouter.post("/create", requireLogin, createTodo);

//partially update Todos
todoRouter.patch("/update/:id", requireLogin, updateTodo);

//partially delete Todos
todoRouter.patch("/delete/:id", requireLogin, deleteTodo);

//Upadate Status
todoRouter.patch("/updateStatus/:id", requireLogin, updateStatus);

module.exports = todoRouter;
