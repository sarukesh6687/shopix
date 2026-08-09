let app;
try {
  app = require('../server');
} catch (e) {
  try {
    app = require('./server');
  } catch (e2) {
    app = require('../../backend/server');
  }
}

module.exports = (req, res) => {
  if (typeof app === 'function') {
    return app(req, res);
  }
  return res.status(500).json({ message: 'Express server module failed to load' });
};
