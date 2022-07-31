const express = require("express");

require("dotenv").config();
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { connectDB } = require("./config/db");
const { issueRoutes } = require("./routes/issues.routes");
const { IssueModel } = require("./models/IssueSchema.model");

const authRouter = require("./routes/auth.routes");
const todoRouter = require("./routes/todo.routes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/issues", issueRoutes);

app.use("/auth", authRouter);
app.use("/todo", todoRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status,
    message: err.message,
  });
});

app.listen(process.env.PORT || 8080, () => {
  try {
    // To connect with DB
    connectDB();
    console.log(`Server started at port ${process.env.PORT}`);
  } catch (e) {
    console.log(e);
  }
});
