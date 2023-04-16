const app = require("./app.js");
const databaseConnection = require("./database/dbConnection.js");

const port = process.env.PORT || 3000;

// Database Connection
databaseConnection();

const serverOn = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

process.on("unhandledRejection", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("...Shutting down the server due to unhandled promise rejection");
  serverOn.close(() => {
    process.exit(1);
  });
});
