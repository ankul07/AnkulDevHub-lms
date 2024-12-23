const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then((data) => {
      console.log(`✓ MongoDB connected with server: ${data.connection.host}`);
    })
    .catch((error) => {
      console.error(`Failed to connect to MongoDB: ${error.message}`);
      process.exit(1); // Exit process if MongoDB connection fails
    });
};

module.exports = connectDatabase;
