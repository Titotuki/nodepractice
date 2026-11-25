const errorMiddleware = (err, req, res, next) => {
    console.error(err);
     if (err.name === "CastError") {
        return res.status(400).json({
            message: "Invalid product ID"
        });
    }
  return res.status(500).json({
        message: "Internal server error"
    });
};

export default errorMiddleware;