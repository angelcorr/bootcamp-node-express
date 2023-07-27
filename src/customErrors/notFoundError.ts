import CustomError from './customError';

class NotFoundError extends CustomError {
  errorCode = 404;
  errorType = 'Not Found';

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export default NotFoundError;
