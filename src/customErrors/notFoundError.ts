import CustomError from './customError';

class NotFoundError extends CustomError {
  errorType = 'Not Found';

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return { message: this.message, errorType: this.errorType };
  }
}

export default NotFoundError;
