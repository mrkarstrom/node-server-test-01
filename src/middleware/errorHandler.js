const errorHandler = (err, req, res, next) => {
  res.status(400).json({ msg: err.message });
};

export default errorHandler;
