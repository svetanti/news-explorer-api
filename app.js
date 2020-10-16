const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const user = require('./routes/user');
const articles = require('./routes/articles');
const NotFoundError = require('./errors/NotFoundError');
const { validateUser, validateLogin } = require('./middlewares/requestValidation');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllres/user');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, DB_ADDRESS } = require('./config');

const app = express();

app.use(helmet());

app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Слишком много запросов с вашего IP, попробуйте повторить попытку позже',
});

app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.post('/signup', validateUser, createUser);
app.post('/signin', validateLogin, login);

app.use('/', auth, user);
app.use('/', auth, articles);

app.use(errorLogger);

app.use(errors());

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
