import express from "express";
import dotenv from "dotenv";
//create app instance
const app = express();

//parse in json
app.use(express.json());

//import env file
dotenv.config();

//import cookie-parser
import cookieParser from "cookie-parser";
app.use(cookieParser());

//define port
const PORT = process.env.PORT || 3000;

//checkk db connection
import db from "./src/comman/config/database.js";

//importy file uplod middlerWare
import fileUpload from "express-fileupload";

app.use(fileUpload());




async function checkConnection() {
  try {
    await db.raw("SELECT 1 + 1 AS result");
    console.log("Database connected successfully....");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

//chek db conection before starting server
checkConnection();

//imnport swager
// import swaggerJSDoc from "swagger-jsdoc";
// import swaggerUI from "swagger-ui-express";

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Node JS API Documentation....",
//       version: "1.0.0",
//     },
//     servers: [
//       {
//         url: `http://localhost:${process.env.PORT}/api`,
//         description: "API Base URL",
//       },
//     ],
//   },
//   apis: ["/src/routes/routes.js"],
// };

// const swaggerDocument = swaggerJSDoc(options);
// app.use("/api/documentation", swaggerUI.serve, swaggerUI.setup(swaggerDocument));


//import routes
import userRoutes from "./src/routes/routes.js";

app.use("/api/v1", userRoutes);

//import swagger
import swaggerConfig from "./src/comman/config/swagger.config.js";
app.use("/api/documentation", swaggerConfig);


//import error handler 
/// always call exception handling middleware after all routes 
import errorHandlerMiddleware from "./src/comman/middleware/error-handler.middleware.js";
app.use(errorHandlerMiddleware); 

//start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(
    `Swagger documentation is available on http://localhost:${PORT}/api/documentation`
  );
});

//default port
app.get("/",(req,res)=>{
res.send("<h1>Hello ......</h1>")
})


export default app