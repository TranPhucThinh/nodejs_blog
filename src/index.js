const path = require('path');
const express = require('express');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const route = require('./routes');
const db = require('./config/db');

// connect to DB
db.connect();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine(
  'hbs',
  hbs.engine({
    extname: 'hbs',
  })
);
app.set('view engine', 'hbs');
app.set('views', './src/resources/views');

// Home, search, contact

// Routes init
route(app);

// start web server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
