import { Request, Response } from 'express';

const ErrorHandler = (_req: Request, res: Response, status = 500, message = 'Interval server error'): void => {
  const err = {
    statusCode: status,
    message,
  };
  res.status(err.statusCode).json({
    success: false,
    error: err,
  });
};

export default ErrorHandler;
