class AuthError {
  static errorCode = 0;
}

class NotFoundError {
  static errorCode = 1;

  constructor(model, message) {
    this.model = model;
    this.message = message;
  }
}

function errorHandler(error, req, res, next) {
  if (error instanceof AuthError) {
    return res.status(401).json({
      errorCode: AuthError.errorCode,
      errorMessage: "invalid email or password",
    });
  }

  throw error;
}

module.exports = { errorHandler, AuthError, NotFoundError };
