//create app instance

const express = require("express");
const app = express();
require("dotenv").config();
//parse in JSON'
app.use(express.json());

//start PORT
const PORT = process.env.PORT || 3000;

//start server
app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});

//connect with db
const db = require("./config/database");

const checkDbConnection = async () => {
  try {
    await db.raw("SELECT 1+1 AS result");
    console.log("Database connected successfully...");
  } catch (error) {
    console.log("error:-",error);
    process.exit(1);
  }
};

checkDbConnection();

//define routes
const userRouter = require("./router/userRouter");
app.use("/api/v1", userRouter);

//define default route
app.get("/", (req, res) => {
  res.send("Hello World");
});
