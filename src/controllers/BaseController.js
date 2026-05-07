class BaseController {
  // Shared success response
  sendSuccess(res, data, message = "Success", statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  // Shared error response
  sendError(res, message = "Internal Server Error", statusCode = 500) {
    return res.status(statusCode).json({
      success: false,
      message,
      data: null,
    });
  }

  // Shared not-found response
  sendNotFound(res, resource = "Resource") {
    return this.sendError(res, `${resource} not found`, 404);
  }

  // Shared validation error response
  sendValidationError(res, errors) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }
}

export default BaseController;