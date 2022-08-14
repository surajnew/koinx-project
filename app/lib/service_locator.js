"use strict";

const {
  asClass,
  asValue,
  Lifetime,
  createContainer,
  listModules,
  aliasTo,
} = require("awilix");

function ServiceLocator() {
  this.container = createContainer();
  this.register();
}

ServiceLocator.prototype.register = function () {
  this.container
    .loadModules(
      ["./app/modules/*/*/*Service.js", "./app/modules/*/*/*Controller.js"],
      {
        formatName: "camelCase",
        resolverOptions: {
          register: asClass,
          lifetime: Lifetime.SINGLETON,
        },
      }
    )
    .loadModules(["./app/providers/*/index.js"], {
      formatName: (name, descriptor) => descriptor.value.name,
      resolverOptions: {
        lifetime: Lifetime.SINGLETON,
        register: asClass
      },
    })
    .loadModules(['./app/service/*.js','./app/models/*.js'],{
      formatName:"camelCase",
      resolverOptions: {
        lifetime: Lifetime.SINGLETON,
        register: asClass,

      }
    })
   .register({
      mongoose:asValue(require("mongoose"))
    }) 
    .register({
      errorHandler : asValue(require('./error_handler.js')),
    })    
    .register({
      nodeFetch : asValue(import('node-fetch')),
    })
    .register({
      nodeCron : asValue(require('node-cron')),
    })
    .register({
      axios:asValue(require('axios'))
    })



};

ServiceLocator.prototype.get=function(dependencyName){
  try {
    return this.container.resolve(dependencyName)
  } catch (error) {
    throw error
  }
}

module.exports = new ServiceLocator();
