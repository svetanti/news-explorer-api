const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const user = require('./routes/user');
const articles = require('./routes/articles');
const NotFoundError = require('./errors/NotFoundError');
const { validateUser, validateLogin } = require('./middlewares/requestValidation');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllres/user');

require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.post('/signup', validateUser, createUser);
app.post('/signin', validateLogin, login);

app.use('/', auth, user);
app.use('/', auth, articles);

app.use(() => {
  throw new NotFoundError({ message: 'Запрашиваемый ресурс не найден' });
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
    return;
  }
  res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
