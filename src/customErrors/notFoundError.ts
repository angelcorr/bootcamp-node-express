import CustomError from './customError';

class NotFoundError extends CustomError {
  errorType = 'Not Found';

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export default NotFoundError;
