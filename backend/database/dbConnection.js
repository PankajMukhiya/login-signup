const mongoose = require("mongoose");

const dbUrl = process.env.DB_URL;

const connectDb = async () => {
  try {
    const response = await mongoose.connect(dbUrl);
    console.log(
      `Databse connection successfull with: ${response.connection.host}`
    );
  } catch (error) {
    console.log(`Error during Db Connection : ${error}`);
  }
};

module.exports = connectDb;
