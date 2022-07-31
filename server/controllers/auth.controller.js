const UserModel = require("../models/UserSchema");
const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const hashPass = crypto
      .pbkdf2Sync(password, "SECRETKEY", 40, 40, "sha256")
      .toString("hex");

    const user = await new UserModel({
      firstname,
      lastname,
      email,
      password: hashPass,
    });
    user.save((err, success) => {
      if (err) {
        return res
          .status(500)
          .send({ type: "error", message: "Internal server error occurred" });
      }
      return res
        .status(201)
        .json({ type: "success", message: "User Registered Successfully!" });
    });
  } catch (e) {
    return res
      .status(500)
      .json({ type: "error", message: "Internal Error Occured" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const hashPass = crypto
      .pbkdf2Sync(password, "SECRETKEY", 40, 40, "sha256")
      .toString("hex");
    const user = await UserModel.findOne({ email: email });
    if (user?.password === hashPass) {
      const token = jwt.sign(
        {
          firstname: user?.firstname,
          lastname: user?.lastname,
          user_id: user?._id,
          email: user?.email,
        },
        "SECRETTOKENKEY",
        {
          expiresIn: "1d",
        }
      );
      return res.status(200).json({
        type: "success",
        message: "User Logged in successfully",
        token: token,
      });
    } else {
      return res
        .status(404)
        .json({ type: "warning", message: "Invalid Credentials" });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ type: "error", message: "Internal Error Occured" });
  }
};

const getProfile = async (req, res) => {
  try {
    let _id = req.user_data._id;
    console.log(_id);

    let profile = await UserModel.find({ _id });
    return res.status(200).send({ type: "success", m: "SU", data: profile });
  } catch (e) {
    return res
      .status(500)
      .json({ type: "error", message: "Internal Error Occured" });
  }
};

module.exports = { registerUser, loginUser, getProfile };
