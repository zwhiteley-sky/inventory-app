const express = require("express");
const { validate } = require("../validate");
const { body, matchedData, param } = require("express-validator");
const productRouter = express.Router();


productRouter.get(
  "/", async (req, res, next) => {
    const { productRepo } = req.repos;
    const products = await productRepo.getAll();
    res.status(200).json(products);

  });


productRouter.post(
  "/",
  validate([
    body("name").notEmpty().withMessage("Product name must not be empty"),
    body("description").notEmpty().withMessage("Product Description must not be empty"),
    body("price").notEmpty().withMessage("Product price must not be empty"),
    body("quantity").notEmpty().withMessage("Product quantity must not be empty"),
    body("categoryId").notEmpty().withMessage("CategoryId must not be empty")

  ]),


  async (req, res, next) => {
    const { productRepo } = req.repos;
    const { name, description, price, quantity, categoryId} = matchedData(req);

    await productRepo.create({ name, description, price, quantity, categoryId });

    res.status(201).send();

  });

productRouter.get(
  "/:id",
  validate([
    param("id").isInt().withMessage("Invalid Product ID")])
    async (req, res, next) => {
      const { productRepo } = req.repos;
      const product = await productRepo.findByPk(id);
      res.status(200).json.apply(product);
    });


productRouter.put(

  "/",
  validate([
    body("name").notEmpty().withMessage("Product name must not be empty"),
    body("description").notEmpty().withMessage("Product Description must not be empty"),
    body("price").notEmpty().withMessage("Product price must not be empty"),
    body("quantity").notEmpty().withMessage("Product quantity must not be empty"),
    body("categoryId").notEmpty().withMessage("CategoryId must not be empty")
  ])
  async (req, res, next ) => {
    const { productRepo } = req.repos;
    const {name, description, price, quantity, categoryId} = matchedData(req);

    await productRepo.update(id, {name, description, price, quantity, categoryId});
    res.status(200).send();

  }
);

productRouter.delete(
  "/:id",
  validate([
    param("id").isInt().withMessage("Invalid Product ID")])
    async (req, res, next) => {
        const { productRepo } = req.repos;
        const product = await productRepo.findByPk(id);
        await product.delete(id)

        res.status(204).send()
    })


module.exports = { productRouter };