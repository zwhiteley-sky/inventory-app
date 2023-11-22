const express = require("express");
const { authRouter } = require("./routes/auth");
const { errorHandler } = require("./error");
require("dotenv").config({
  path: `${__dirname}/../.env`,
});

function createApp(repos) {
  const app = express();

  app.use((req, _, next) => {
    req.repos = repos;
    next();
  });
  app.use(express.json());
  app.use("/auth", authRouter);
  app.use(errorHandler);

  return app;
}

module.exports = {
  createApp,
};
