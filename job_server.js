const serviceLocator = require("./app/lib/service_locator");
const path = require("path");
const fs = require("fs");
const nodeCron = serviceLocator.get("nodeCron");
const jobPath = path.resolve("./app/jobs");
const files = fs.readdirSync(jobPath);
const jobConfig = require("./app/config/job_config");
const jobServer = async () => {
  console.log('job server started')
  try {
    for (const file of files) {
      let filename = file.split(".")[0];
      const Task = require(`${jobPath}/${filename}`);
      const task = new Task();
      let cron_time = jobConfig.JOBS_SCHEDULE[task.taskName];
      if (nodeCron.validate(cron_time)) {
        nodeCron.schedule(cron_time, task.taskHandler)
      }
    }
  } catch (error) {
    console.log(error.message)
  }
};

module.exports = jobServer;
