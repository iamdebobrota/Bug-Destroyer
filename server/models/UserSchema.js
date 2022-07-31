const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  email: {
    type: String,
    require: true,
    unique: [true, "Email already present"],
  },
  profile: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  },
  password: { type: String, require: true },
  access: { type: String, require: true }
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
