import mysql from "mysql";

const connection = mysql.createConnection({
  host: "your-database-host",
  user: "your-database-user",
  password: "your-database-password",
  database: "your-database-name",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});

export default connection;
