const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ msg: err.message });
  } else {
    res.status(200).json({ msg: err.message });
  }
  next();
};

export default errorHandler;
