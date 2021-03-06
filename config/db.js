const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to ${res.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
