const express = require("express");
const { validate } = require("../validate");
const { body, matchedData, param } = require("express-validator");
const { ServerError, NotFoundError, AuthError } = require("../error");
const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const { productRepo } = req.repos;
  const products = await productRepo.getAll();
  res.status(200).json(products);
});

productRouter.post(
  "/",
  validate([
    body("name")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Product name must not be empty"),
    body("description")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Product Description must not be empty"),
    body("price").isFloat().withMessage("Product price must be numeric"),
    body("quantity")
      .isInt()
      .withMessage("Product quantity must be numeric"),
    body("categoryId").isInt().withMessage("CategoryId must be an integer"),
  ]),
  async (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
      return next(new AuthError());
    }

    const { productRepo } = req.repos;
    const { name, description, price, quantity, categoryId } = matchedData(req);

    const result = await productRepo.create({
      name,
      description,
      price,
      quantity,
      categoryId,
    });

    if (result.type === "error") {
      if (result.errorCode !== 0 || result.errorModel !== "category") {
        return next(new ServerError());
      }

      return next(new NotFoundError(
        "category",
        "invalid categoryId provided"
      ));
    }

    res.status(201).send();
  }
);

productRouter.get(
  "/:id",
  validate([param("id").isInt().withMessage("Invalid Product ID")]),
  async (req, res, next) => {
    const { productRepo } = req.repos;
    const { id } = matchedData(req);
    const product = await productRepo.get(id);

    if (!product) {
      return next(new NotFoundError(
        "product",
        "invalid id provided"
      ));
    }

    res.status(200).json(product);
  }
);

productRouter.put(
  "/:id",
  validate([
    param("id").isInt().withMessage("id parameter must be an integer"),
    body("name").notEmpty().withMessage("Product name must not be empty"),
    body("description")
      .notEmpty()
      .withMessage("Product Description must not be empty"),
    body("price").isFloat().withMessage("Product price must be numeric"),
    body("quantity")
      .isInt()
      .withMessage("Product quantity must be numeric"),
    body("categoryId").isInt().withMessage("CategoryId must be an integer"),
  ]),
  async (req, res, next) => {
    // Run authentication
    if (!req.user || req.user.role !== "admin") {
      return next(new AuthError());
    }

    const { productRepo } = req.repos;
    const { id, name, description, price, quantity, categoryId } =
      matchedData(req);

    const result = await productRepo.update(id, {
      name,
      description,
      price,
      quantity,
      categoryId,
    });

    if (result.type === "error") {
      if (result.errorCode !== 0) return next(new ServerError());
    
      switch (result.errorModel) {
        case "product":
          return next(new NotFoundError(
            "product",
            "invalid product id provided"
          ));

        case "category":
          return next(new NotFoundError(
            "category",
            "invalid categoryId provided"
          ));

        default:
          return next(new ServerError());
      }
    }

    res.status(204).send();
  }
);

productRouter.delete(
  "/:id",
  validate([param("id").isInt().withMessage("Invalid Product ID")]),
  async (req, res, next) => {
    // Validate authentication
    if (!req.user || req.user.role !== "admin") {
      return next(new AuthError());
    }

    const { productRepo } = req.repos;
    const { id } = matchedData(req);
    const result = await productRepo.delete(id);

    if (result && result.type === "error") {
      if (result.errorCode !== 0 || result.errorModel !== "product") {
        return next(new ServerError());
      }

      return next(new NotFoundError(
        "product",
        "invalid id provided"
      ));
    }

    res.status(204).send();
  }
);

module.exports = { productRouter };