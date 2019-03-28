// modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

// config
const config = require('./config');

// 3. Initialize the application
const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (app.get('env') === 'production') {
  app.use((req, res, next) => {
    const protocol = req.get('x-forwarded-proto');
    protocol == 'https'
      ? next()
      : res.redirect('https://' + req.hostname + req.url);
  });
}

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true });
mongoose.connection.on('error', function(err) {
  console.log('Error: Could not connect to MongoDB.');
});

require('./routes')(app);

app.listen(config.LISTEN_PORT, function() {
  console.log('listening on port ' + config.LISTEN_PORT);
});
