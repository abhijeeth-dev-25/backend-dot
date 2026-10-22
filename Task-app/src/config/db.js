const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongodb_url);
    console.log("db connected");
  } catch (error) {
    console.log("error in db", error);
  }
};

module.exports = connectDB;