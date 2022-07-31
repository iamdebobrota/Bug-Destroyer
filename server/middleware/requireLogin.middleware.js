const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserSchema");

const requireLogin = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ status: 401, message: "You must logged in" });
  }
  const token = authorization.split(" ")[1];
  jwt.verify(token, "SECRETTOKENKEY", (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: 401, message: "Please Re-login" });
    }
    const { user_id } = decoded;
    UserModel.findById({ _id: user_id })
      .then((user) => {
        // return res
        //   .status(200)
        //   .json({ status: 200, message: "Success", user: user });
        if (user == null) {
          return res
            .status(404)
            .send({ status: 404, message: "User not found" });
        }
        req.user_data = user;
        // console.log(user);
        next();
      })
      .catch((e) => {
        return res.status(404).send({ status: 404, message: "User not found" });
      });
  });
};

module.exports = { requireLogin };
