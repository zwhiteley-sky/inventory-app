const express = require("express");
const { validate } = require("../validate");
const { param, matchedData } = require("express-validator");
const { NotFoundError, AuthError } = require("../error");
const userRouter = express.Router();

userRouter.get("/", async (req, res, next) => {
  // Check authentication
  if (!req.user || req.user.role !== "admin") {
    return next(new AuthError());
  }

  const { userRepo } = await req.repos;
  const users = await userRepo.getAll();
  return res.json(
    // Map the users to prevent the password hash from being
    // included in the result
    users.map((user) => ({
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      emailAddress: user.emailAddress,
    }))
  );
});

userRouter.get(
  "/:id",
  validate([param("id").isInt().withMessage("id parameter must be an integer")]),
  async (req, res, next) => {
    // Check authentication
    if (!req.user || req.user.role !== "admin") {
      return next(new AuthError());
    }

    const { userRepo } = req.repos;
    const { id } = matchedData(req);

    const user = await userRepo.get(id);
    if (!user) {
      return next(new NotFoundError(
        "user",
        "no user exists with the id specified"
      ));
    } else res.json({
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      emailAddress: user.emailAddress
    });
  }
);

module.exports = { userRouter };
