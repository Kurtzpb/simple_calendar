// modules
const moment = require('moment');
const jwt = require('jwt-simple');

// models
const Events = require('../models/event.js');

// config
const { TOKEN_SECRET } = require('../config');

exports.save = async (req, res) => {
  const { title, timeStart, timeEnd } = req.body;
  const token = req.headers.authorization.split(' ')[1];
  const userName = jwt.decode(token, TOKEN_SECRET);

  const eventToSave = new Events({
    title,
    timeStart,
    timeEnd,
    userName,
    date: moment().format('MMM Do YY')
  });

  eventToSave.save();

  try {
    const events = await Events.find(
      { date: moment().format('MMM Do YY'), userName },
      'title timeStart timeEnd _id'
    );
    res.json({ data: events });
  } catch (err) {
    res.json(err);
  }
};

exports.events = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const userName = jwt.decode(token, TOKEN_SECRET);

  try {
    const events = await Events.find(
      { date: moment().format('MMM Do YY'), userName },
      'title timeStart timeEnd _id'
    );
    res.json({ data: events });
  } catch (err) {
    res.json(err);
  }
};

exports.delete = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const userName = jwt.decode(token, TOKEN_SECRET);
  const { id } = req.body;
  await Events.findByIdAndRemove(id);

  const events = await Events.find(
    { date: moment().format('MMM Do YY'), userName },
    'title timeStart timeEnd _id'
  );

  res.json({ data: events });
};
