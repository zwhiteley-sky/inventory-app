const express = require("express");
const { authRouter, authHandler } = require("./routes/auth");
const { categoryRouter } = require("./routes/category");
const { errorHandler } = require("./error");
const { productRouter } = require("./routes/product");
const { orderRouter } = require("./routes/order");
const { userRouter } = require("./routes/user");
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
  app.use(authHandler);
  app.use("/auth", authRouter);
  app.use("/category", categoryRouter);
  app.use("/product", productRouter);
  app.use("/order", orderRouter);
  app.use("/user", userRouter);
  app.use(errorHandler);


  return app;
}

module.exports = {
  createApp,
};
