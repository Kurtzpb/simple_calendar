// modules
const jwt = require('jwt-simple');

// controllers
const Auth = require('./controllers/auth.js');
const Events = require('./controllers/events.js');

// config
const { TOKEN_SECRET } = require('./config');

const ensureAuthenticated = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ error: 'Token Missing' });
  }
  const token = req.headers.authorization.split(' ')[1];

  try {
    const payload = jwt.decode(token, TOKEN_SECRET);
    if (payload) next();
  } catch (err) {
    return res.status(401).send({ error: 'Token Invalid' });
  }
};

module.exports = app => {
  app.post('/auth/register', Auth.register);
  app.post('/auth/login', Auth.login);
  app.get('/user', ensureAuthenticated, Auth.user);
  app.get('/events', ensureAuthenticated, Events.events);
  app.post('/event/save', ensureAuthenticated, Events.save);
  app.post('/event/delete', ensureAuthenticated, Events.delete);
};
