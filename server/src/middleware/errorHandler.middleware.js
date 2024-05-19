export const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err.name === 'ValidationError') {
    return res.status(400).json({ success: false, error: err.message });
  }

  if (err.message === 'MongoServerError: 11000') {
    return res
      .status(409)
      .json({ success: false, error: 'Duplicate key error' });
  }

  res
    .status(500)
    .json({ success: false, error: 'An internal server error occurred' });
};
