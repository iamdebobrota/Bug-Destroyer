const { connect } = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await connect(
      `${process.env.MONGO_START}${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}${process.env.MONGO_END}`
    );
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log(e);
  }
};

module.exports = { connectDB };
