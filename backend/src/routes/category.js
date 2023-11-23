const express = require("express");
const categoryRouter = express.Router();

categoryRouter.get("/", async (req, res) => {
  const { categoryRepo } = req.repos;
  const categories = await categoryRepo.getAll();

  res.json(categories);
});

module.exports = { categoryRouter };
