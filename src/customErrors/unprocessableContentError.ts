import CustomError from './customError';

class UnprocessableContentError extends CustomError {
  errorType = 'Unprocessable Content';

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, UnprocessableContentError.prototype);
  }

  serializeErrors() {
    // console.log('this.message', this.message);

    return { message: this.message, errorType: this.errorType };
  }
}

export default UnprocessableContentError;
