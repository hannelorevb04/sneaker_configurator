const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./db');  // Aangepaste import voor database verbinding
require('dotenv').config();
const cors = require('cors');
const http = require('http');
/*const socketIo = require('socket.io');
const bcrypt = require('bcryptjs');*/

require('dotenv').config(); // Laad de .env-bestand variabelen



// Verbind met de database
connectDB();

const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Voeg CORS-middleware toe
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Routes (zoals in jouw app.js)
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiOrdersRouter = require('./routes/api/v1/orders');
const apiProductsRouter = require('./routes/api/v1/products');
const apiUsersRouter = require('./routes/api/v1/users');

// Gebruik routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/orders', apiOrdersRouter);
app.use('/api/v1/products', apiProductsRouter);
app.use('/api/v1/users', apiUsersRouter);

// Foutafhandeling
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
      status: "error",
      message: err.message,
      stack: req.app.get('env') === 'development' ? err.stack : {}
  });
});



module.exports = app;
