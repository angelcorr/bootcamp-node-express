import CustomError from './customError';

class BadRequestError extends CustomError {
  errorType = 'Bad Request';

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return { message: this.message, errorType: this.errorType };
  }
}

export default BadRequestError;
