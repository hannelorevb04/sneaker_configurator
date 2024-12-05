const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize express app
const app = express();

// Verbinden met MongoDB via Mongoose
const dbUri = config.get('mongodb.uri');
mongoose.connect(dbUri)
  .then(() => console.log('Verbonden met MongoDB'))
  .catch(err => console.error('Fout bij verbinden met MongoDB:', err));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // Wijzig 'jade' naar 'pug'

// Voeg CORS toe zodat cross-origin verzoeken toegestaan worden voor alle routes
app.use(cors({
  origin: 'http://localhost:5173',  // Sta alleen de frontend URL toe
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiOrdersRouter = require('./routes/api/v1/orders');
const apiProductsRouter = require('./routes/api/v1/products');
const apiUsersRouter = require('./routes/api/v1/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/orders', apiOrdersRouter);
app.use('/api/v1/products', apiProductsRouter);
app.use('/api/v1/users', apiUsersRouter);

// Foutafhandeling voor niet-gevonden routes
app.use(function(req, res, next) {
  next(createError(404));
});

// Algemene error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
