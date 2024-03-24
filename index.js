// const express = require("express");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const app = express();

// dotenv.config();

// const connectDB = async () => {
//   const connect = await mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   console.log("server is conncted")
// };
// connectDB();
// app.get("/", function (req, res) {
//   res.send("This is test api");
// });
// // console.log(process.env.MONGO_URI);

// const PORT = process.env.PORT || 6000;

// app.listen(PORT, console.log("server is runing on port " + PORT));

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./src/routes/userRoutes");
const cors = require('cors')

const app = express();

dotenv.config();
app.use(express.json());
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

// Call the connectDB function
connectDB();

app.get("/", function (req, res) {
  res.send("This is a test API");
});
app.use("/user", userRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
