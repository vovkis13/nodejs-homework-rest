const validateContact = scheme => async (req, res, next) => {
  try {
    await scheme.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { validateContact };
