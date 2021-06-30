/* 
  根据不同的环境 加载对应的配置文件
*/
const activeEnv =
  process.env.ACTIVE_ENV || process.env.NODE_ENV || "dev";

console.log(`当前配置环境: '${activeEnv}'`);

require("dotenv").config({
  path: `.env.${activeEnv}`,
});

/* 
  expressjs
*/
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors({})); // cors

app.get("/", (req, res) => {
  console.log('Hello World!');
  res.send("Hello World!!");
});

// app startup
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`cron job listening at http://localhost:${port}`);
});