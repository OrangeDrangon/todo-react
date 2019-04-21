const ghPages = require("gh-pages");

ghPages.publish("build", {
  message: "Deploying app...",
  repo:  `https://${process.env.ACCESS_TOKEN}@github.com/OrangeDrangon/todo-react.git`,
  silent: true
}, (err) => {
  if (err) {
    throw err;
  }
  console.log("Success!");
});
