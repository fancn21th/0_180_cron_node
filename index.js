// 根据不同的环境 加载对应的配置文件
const activeEnv =
  process.env.ACTIVE_ENV || process.env.NODE_ENV || "development";

console.log(`当前配置环境: '${activeEnv}'`);

require("dotenv").config({
  path: `.env.${activeEnv}`,
});
