const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./db');  
require('dotenv').config();
const cors = require('cors');
const http = require('http');
/*const socketIo = require('socket.io');
const bcrypt = require('bcryptjs');*/

require('dotenv').config(); 




connectDB();

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


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

// foutafhandeling
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
