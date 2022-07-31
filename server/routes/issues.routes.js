const express = require("express");
const {
  getAllIssues,
  createIssue,
  updateIssue,
  deleteIssue,
  commentToIssue,
} = require("../controllers/issues.controller");
const { requireLogin } = require("../middleware/requireLogin.middleware");

const issueRoutes = express.Router();

issueRoutes.get("/all", requireLogin, getAllIssues);
issueRoutes.post("/create", requireLogin, createIssue);
issueRoutes.patch("/update/:id", requireLogin, updateIssue);
issueRoutes.delete("/delete/:id", requireLogin, deleteIssue);
issueRoutes.patch("/comment/:id", requireLogin, commentToIssue);

module.exports = { issueRoutes };
