const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('config'); // Importeer de configuratie slechts één keer
const mongoose = require('mongoose'); // Importeer Mongoose

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiOrdersRouter = require('./routes/api/v1/orders');
const apiProductsRouter = require('./routes/api/v1/products');

const db = config.get('mongodb.uri');

// Verbinden met MongoDB via Mongoose
mongoose.connect(db)
  .then(() => console.log('Verbonden met MongoDB'))
  .catch(err => console.error('Fout bij verbinden met MongoDB', err));

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/orders', apiOrdersRouter);
app.use('/api/v1/products', apiProductsRouter);

// Product-specific POST route
const Product = require('./models/Product'); // Zorg dat je een Mongoose-model hebt voor producten

// POST Route voor products
app.post('/api/v1/products', async (req, res) => {
  try {
    const { name, price, description } = req.body;

    // Validatie
    if (!name || !price) {
      return res.status(400).json({ error: "Product moet een naam en prijs hebben" });
    }

    // Nieuw product opslaan
    const product = new Product({ name, price, description });
    const savedProduct = await product.save();

    res.status(201).json({ message: "Product toegevoegd", product: savedProduct });
  } catch (err) {
    console.error("Fout bij toevoegen product:", err);
    res.status(500).json({ error: "Interne serverfout" });
  }
});

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
