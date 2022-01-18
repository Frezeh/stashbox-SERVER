// dependencies
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');

// routes
const homePageRouter = require('./routes/homepage');
const addTaskRouter = require('./routes/addTask');
const listTaskRouter = require('./routes/listTask');
const editTaskRouter = require('./routes/editTask');
const deleteTaskRouter = require('./routes/deleteTask');

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: https://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// enable dependencies
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', homePageRouter);
app.use('/add', addTaskRouter);
app.use('/list', listTaskRouter);
app.use('/edit', editTaskRouter);
app.use('/delete', deleteTaskRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  })
});

module.exports = app;
