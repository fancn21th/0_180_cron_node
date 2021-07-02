/* 
  根据不同的环境 加载对应的配置文件
*/
const activeEnv = process.env.ACTIVE_ENV || process.env.NODE_ENV || "dev";

console.log(`当前配置环境: '${activeEnv}'`);

require("dotenv").config({
  path: `.env.${activeEnv}`,
});

/* 
  cron
  ref:https://github.com/node-cron/node-cron
*/
const cron = require("node-cron");

const messages = process.env.MSG && process.env.MSG.split("|");

const task = cron.schedule(
  process.env.CRON,
  () => {
    console.log("notify done once");
    notify(messages[Math.floor(Math.random() * messages.length)]);
  },
  {
    scheduled: false,
  }
);

task.start(); // cron start

/* 
  expressjs
*/
const express = require("express");
const cors = require("cors");
const notify = require("./utils/notify");

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors({})); // cors

app.get("/", (req, res) => {
  console.log("hello cron job!");
  res.send("hello cron job!");
});

// start the cron
app.post("/start", (req, res) => {
  console.log("Cron Job 启动");
  res.send("Cron Job Starts!!");
  task.start();
});
// stop the cron
app.post("/stop", (req, res) => {
  console.log("Cron Job 停止");
  res.send("Cron Job Stops!!");
  task.stop();
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`cron job listening at http://localhost:${port}`);
});
