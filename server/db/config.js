const mongoose = require("mongoose");


module.exports.Connection  = async (URL) => {
  try {
    await mongoose.connect(URL, {
      useunifiedTopology: true,
      useNewurlparser: true,
    });
    console.log("Database connected Successfully");
  } catch (error) {
    console.log("Error while connecting with the database ", error.message);
  }
};
