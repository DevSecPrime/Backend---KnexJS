//create instance for connection
// const { throws } = require("assert");
var mysql = require("mysql2");

//create connection
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employeeDB",
});

con.connect(function (error) {
  if (error) {
    console.error("Error:-", error);
    process.exit(1);
  } else {
    console.log("MySQL connection is successful...");

    con.query("select * from EmployeeInfoTable", (error, result) => {
      if (error) {
        console.log("Error :", error);
        throw error;
      } else {
        console.log("Result :- ", result[0].Project);
      }
    });
  }
});
