import { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';

const errorHandler: ErrorRequestHandler = (err, req, res,next) => {
  // Set default status code
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Initialize error response
  const errorResponse: {
    message: string;
    errors?: { [key: string]: string };
    stack?: string;
  } = {
    message: err.message,
  };

 

  // Handle Mongoose validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    const errors: { [key: string]: string } = {};
    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });
    errorResponse.message = 'Validation failed';
    errorResponse.errors = errors;
  }

  // Handle other error types
  res.status(statusCode).json(errorResponse);
  next()
};

export default errorHandler;