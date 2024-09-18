import knex from "knex";
import knexFile from "../../../knexfile"; // Adjust path if necessary
import dotenv from "dotenv";

dotenv.config();

const environment = process.env.NODE_ENV || "development";

const dbConnection = knex(knexFile[environment]);

export default dbConnection;
