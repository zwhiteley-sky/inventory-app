const express = require("express");
const { validate } = require("../validate");
const { body, matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { AuthError } = require("../error");
const authRouter = express.Router();

authRouter.post(
  "/login",
  validate([
    body("emailAddress").isEmail().withMessage("valid email must be provided"),
    body("password")
      .isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
      })
      .withMessage("password must have 1 uppercase and 1 number"),
  ]),
  async (req, res, next) => {
    const { userRepo } = req.repos;
    const { emailAddress, password } = matchedData(req);

    const user = await userRepo.findByEmail(emailAddress);

    if (!user) {
      return next(new AuthError());
    }

    if (!bcrypt.compareSync(password, user.passwordHash)) {
      return next(new AuthError());
    }

    const jwt_key = Buffer.from(process.env.JWT_KEY, "base64");
    const jwt_payload = {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
    };
    const jwt = jsonwebtoken.sign(jwt_payload, jwt_key, {
      expiresIn: "24h",
    });

    res.status(200).json({
      ...jwt_payload,
      token: jwt,
    });
  }
);

authRouter.post(
  "/register",
  validate([
    body("username")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("username must not be empty"),
    body("fullName")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("username must not be empty"),
    body("emailAddress")
      .isEmail()
      .withMessage("email must be valid email address"),
    body("password")
      .isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
      })
      .withMessage("password must have 1 uppercase and 1 number"),
  ]),
  async (req, res) => {
    const { userRepo } = req.repos;
    const { username, fullName, emailAddress, password } = matchedData(req);

    const passwordHash = bcrypt.hashSync(password, 12);

    await userRepo.create({
      username,
      fullName,
      emailAddress,
      passwordHash,
    });

    res.status(204).send();
  }
);

module.exports = { authRouter };
