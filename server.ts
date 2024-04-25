import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./src/app";

dotenv.config();

const PORT = process.env.PORT || 9000;

/// Start the server
const mongooseDbOptions = {
  autoIndex: true, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/Batch37", mongooseDbOptions)
  .then(() => {
    console.log("⚡️[MongoDB]:Connected to MongoDB");
    //should listen app here
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to Connect to MongoDB", err);
  });
