// middlewares/errorHandler.js
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json(new ApiResponse(err.statusCode, null, err.message));
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const validationErrors = Object.values(err.errors).map(
      (error) => error.message
    );
    return res
      .status(400)
      .json(new ApiResponse(400, null, validationErrors.join(", ")));
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Invalid or expired token"));
  }

  // Handle file size limits
  if (err.code === "LIMIT_FILE_SIZE") {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "File size too large"));
  }

  // Handle CORS errors
  if (err.message === "Not allowed by CORS") {
    return res
      .status(403)
      .json(new ApiResponse(403, null, "CORS error: Origin not allowed"));
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "Internal Server Error"
      : err.message || "Something went wrong";

  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, null, message));
};

export default errorHandler;
