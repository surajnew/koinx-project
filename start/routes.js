const { listModules } = require("awilix");
const path = require("path");
const rootpath = path.resolve(__dirname, "../");
const routes = listModules([`${rootpath}/app/modules/*/*/*Route.js`]);
const express = require("express");


module.exports = (server, serviceLocator) => {
  for (let route of routes) {
    console.log(route.path)
    let pathName = require(route.path);
    const router = express.Router();
    server.use(`/api`, router);
    pathName.routes(serviceLocator, router);
  }
};
