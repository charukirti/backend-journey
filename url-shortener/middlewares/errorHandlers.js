/* ------------------- Error Class ----------------------------- */

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

/* ----------------------- Error handler middleware ------------------ */

const errorHandler = (err, req, res, next) => {
    console.log("Error:", err);

    const statusCode = err.statusCode || 500;
    const message = err.isOperational ? err.message : "Something went wrong";

    res.status(statusCode).json({
        success: false,
        message
    });
};

export { AppError, errorHandler };