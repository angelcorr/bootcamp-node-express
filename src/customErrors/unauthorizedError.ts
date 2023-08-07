import CustomError from './customError';

class UnauthorizedError extends CustomError {
  errorType = 'Unauthorized';

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return { message: this.message, errorType: this.errorType };
  }
}

export default UnauthorizedError;
