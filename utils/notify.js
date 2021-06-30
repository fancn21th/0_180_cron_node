const request = require("./request");

const notify = (message) => {
  if (process.env.ROBOT_ONE) {
    request.post({
      url: process.env.ROBOT_ONE,
      data: {
        msgtype: "text",
        text: {
          content: message,
          // mentioned_list: [process.env.ADMIN_ITCODE, "@all"],
          // mentioned_mobile_list: [process.env.ADMIN_ITCODE, "@all"],
          mentioned_list: [process.env.ADMIN_ITCODE],
          mentioned_mobile_list: [process.env.ADMIN_ITCODE],
        },
      },
    });
  }
};

module.exports = notify;
