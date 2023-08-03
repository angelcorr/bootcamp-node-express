import CustomError from './customError';

class UnprocessableContentError extends CustomError {
  errorType = 'Unprocessable Content';

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, UnprocessableContentError.prototype);
  }

  serializeErrors() {
    return { message: this.message, errorType: this.errorType };
  }
}

export default UnprocessableContentError;
