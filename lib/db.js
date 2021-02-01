const mysql2 = require("mysql2");
// const connection = mysql2.createConnection({
//   host: "ra1.anystream.eu",
//   user: "cb12ptjs",
//   password: "cb12ptjs",
//   database: "cb12ptjs",
//   port: "5420",
// });

const connection = mysql2.createConnection({
  host: "localhost",
  user: "name",
  password: "password",
  database: "cb12ptjs",
  port: "3306",
});

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected!");
  }
});

module.exports = connection;
