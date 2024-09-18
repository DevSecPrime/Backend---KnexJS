//import knex instance
import knex from 'knex';

import knexFile from "../../../knexfile";

//Import environment variables\
require("dotenv").config();

const environment = process.env.NODE_ENV || "development";

const dbConnect = knex(knexFile[environment]);

export default dbConnect;