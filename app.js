require("dotenv").config();
const express = require("express");
const app = express();
const serviceLocator = require("./app/lib/service_locator");
const route = require("./start/routes");
const PORT = process.env.PORT || 5000;
const errorHandler = serviceLocator.get("errorHandler");
const jobServer = require("./job_server");
const bodyParser = require("body-parser");
const Database = serviceLocator.get("Database");

// jobServer();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//register routes
route(app, serviceLocator);

//handle errors
errorHandler(app);

const startServer = async () => {
  await Database._connect(process.env.MONGO_URI);

  app.listen(PORT, () => {
    console.log("server started on 5000");
  });
};

startServer();

//MDKNKDQCWTA5ACE7U4MDWQYFFBBWD8W2MZ
