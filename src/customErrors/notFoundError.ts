import CustomError from './';

class NotFoundError extends CustomError {
  errorCode = 400;
  errorType = 'Not Found';

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export default NotFoundError;
