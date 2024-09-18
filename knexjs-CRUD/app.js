import { json } from "express";
import express from "express"; //import express
const app = express(); //create app instance

app.use(json()); //parsee in json

require("dotenv").config();

const PORT = process.env.PORT || 3000; ///define PORT

//connect with DB
import { raw } from "./src/comman/config/database";

const testConnection = async () => {
  try {
    await raw("select 1+1 as result");
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting with DB", error);
    process.exit(1);
  }
};

testConnection();

//import cookie-parser for parse thee token
import cookieParser from "cookie-parser";
app.use(cookieParser());

//define routes
import apiRoute from "./src/Routes/routes";

app.use("/api/v1", apiRoute);
//listen PORT
app.listen(PORT, () => {
  console.log(`Server started on port : ${PORT}`);
});

//define Default PORT
app.get("/", (req, res) => {
  console.log("Hello World");
  res.send("Hello World");
});
