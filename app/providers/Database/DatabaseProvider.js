const { listModules } = require("awilix");
const path = require("path");
const fs = require("fs");
const rootPath = path.resolve(__dirname, "../", "../", "../", "app/modules");
const modelsPath = path.resolve("./app/models");

console.log(modelsPath);
class Database {
  constructor(opts) {
    this.mongoose = opts.mongoose;
    this.models = listModules([`${rootPath}/*/*Model.js`]);
  }

  async _connect(uri) {
    return new Promise((resolve, reject) => {
      //connect to database

      this.mongoose.connect(uri);
      const { connection } = this.mongoose;

      connection.on("connected", () => {
        console.log("database Connected");
        return resolve('');
      });

      connection.on("disconnected", (err) => {
        console.log("disconnected");
        return reject(err);
      });

      //register all models
      let files = fs.readdirSync(modelsPath);
      for (let file of files) {
        let filename = file.split(".")[0];
        require(`${modelsPath}/${filename}`);
      }

      for (let model of this.models) {
        require(model.path);
      }
    });
  }
}
module.exports = Database;
