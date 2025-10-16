const { ValidationError, NotFoundError } = require("../utils/errors");

module.exports = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof ValidationError)
    return res.status(400).json({ error: err.message });
  if (err instanceof NotFoundError)
    return res.status(404).json({ error: err.message });

  res.status(500).json({ error: "Internal Server Error" });
};
