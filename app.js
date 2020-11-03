const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
const router = require('./routes');
const limiter = require('./limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const { PORT, DB_ADDRESS } = require('./config');

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://localhost:3000'],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(helmet());
app.use(cookieParser());
app.use(cors());
app.options('*', cors(corsOptions));

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
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
