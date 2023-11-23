const express = require("express");
const { validate } = require("../validate");
const { body, matchedData, param } = require("express-validator");
const { AuthError, ServerError, NotFoundError, NoProductLeftError } = require("../error");
const orderRouter = express.Router();

orderRouter.get(
  "/",
  async (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
      return next(new AuthError());
    }

    const { userRepo } = req.repos;
    const orders = await userRepo.getAll();
    res.json(orders);
  }
)

orderRouter.get(
  "/:id",
  validate([
    param("id").isInt().withMessage("the id parameter must be an integer"),
  ]),
  async (req, res, next) => {
    // Check the authentication
    if (!req.user) {
      return next(new AuthError());
    }

    // Get the information
    const { id: orderId } = matchedData(req);
    const { id: userId } = req.user;

    // Get the order repository
    const { orderRepo } = req.repos;

    // Get the order
    const order = await orderRepo.get(orderId);

    // If the order id does not exist, or the user does not
    // own the order, return a 404
    if (!order || order.userId !== userId) {
      return next(new NotFoundError("order", "the id provided was invalid"));
    }

    res.status(200).json(order);
  }
);

orderRouter.post(
  "/",
  validate([
    body("productId").isInt().withMessage("productId must be an integer"),
  ]),
  async (req, res, next) => {
    // Check user is authenticated
    if (!req.user) {
      return next(new AuthError());
    }

    // Get the information
    const { id: userId } = req.user;
    const { productId } = matchedData(req);
    
    // Get the order repository
    const { orderRepo } = req.repos;

    // Create the order
    const result = await orderRepo.create({ userId, productId });

    // If an error occurred
    if (result.type === "error") {
      if (result.errorCode === 1) {
        return next(new NoProductLeftError());
      }

      // If a misc error occurred
      if (result.errorCode !== 0 || result.errorModel !== "product") {
        return next(new ServerError());
      }

      // If the error was caused as a result of
      // `productId` being invalid
      return next(
        new NotFoundError(
          "product",
          "the productId provided does not correspond to a real product"
        )
      );
    }

    res.status(204).send();
  }
);

module.exports = { orderRouter };
