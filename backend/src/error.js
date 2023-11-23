class ServerError {
  static errorCode = 0;
}

class AuthError {
  static errorCode = 1;
}

class NotFoundError {
  static errorCode = 2;

  constructor(model, message) {
    this.model = model;
    this.message = message;
  }
}

function errorHandler(error, req, res, next) {
  if (error instanceof ServerError) {
    return res.status(500).json({
      errorCode: ServerError.errorCode,
      errorMessage: "an unknown error occurred"
    });
  } else if (error instanceof AuthError) {
    return res.status(401).json({
      errorCode: AuthError.errorCode,
      errorMessage: "invalid email, token, or password",
    });
  } else if (error instanceof NotFoundError) {
    return res.status(404).json({
      errorCode: NotFoundError.errorCode,
      errorModel: error.model,
      errorMessage: error.message
    });
  }

  throw error;
}

module.exports = { errorHandler, ServerError, AuthError, NotFoundError };
