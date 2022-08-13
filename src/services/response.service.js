const ResponseService = {
  json(res, status, message, data) {
    res.status(status).json({ message, data });
  },
};

module.exports = ResponseService;
