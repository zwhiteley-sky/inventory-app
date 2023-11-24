const express = require("express");
const { validate } = require("../validate");
const { body, matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { AuthError } = require("../error");
const authRouter = express.Router();

/**
 * The authentication handler (verifies tokens).
 * @param {import('express').Request} req - The request.
 * @param {import('express').Response} res - The response.
 * @param {import('express').NextFunction} next - The middleware.
 */
function authHandler(req, _, next) {
  const BEARER = "bearer ";
  const authHeader = req.headers["authorization"];
  const jwtKey = Buffer.from(process.env.JWT_KEY, "base64");
  let jwt;

  if (!authHeader) return next();
  if (authHeader.toLowerCase().startsWith(BEARER)) {
    jwt = authHeader.slice(BEARER.length);
  }

  try {
    const payload = jsonwebtoken.verify(jwt, jwtKey);
    req.user = payload;
  } catch (e) {}

  return next();
}

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

    const jwtKey = Buffer.from(process.env.JWT_KEY, "base64");
    const jwtPayload = {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      emailAddress: user.emailAddress,
      role: user.role
    };
    const jwt = jsonwebtoken.sign(jwtPayload, jwtKey, {
      expiresIn: "24h",
    });

    res.status(200).json({
      ...jwtPayload,
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
      role: "user",
      passwordHash,
    });

    res.status(204).send();
  }
);

module.exports = { authHandler, authRouter };
