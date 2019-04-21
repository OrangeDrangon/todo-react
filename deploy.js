const ghPages = require("gh-pages");

ghPages.publish("build", {
  message: "Deploying app...",
})
