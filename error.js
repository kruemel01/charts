
function AppError(errno = 500, message = "Internal Server Error") {
  this.name = AppError;

  this.details = {
    errno,
    message
  }

  this.isAppError = true;

  Error.captureStackTrace(this, AppError);
}

require("util").inherits(AppError, Error);

module.exports = AppError;
