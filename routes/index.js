const router = require('express').Router();
const user = require('./user');
const articles = require('./articles');
const auth = require('../middlewares/auth');
const { validateUser, validateLogin } = require('../middlewares/requestValidation');
const { createUser, login } = require('../controllres/user');
const NotFoundError = require('../errors/NotFoundError');
const { NOT_FOUND } = require('../constants');

router.post('/signup', validateUser, createUser);
router.post('/signin', validateLogin, login);

router.use(auth, user);
router.use(auth, articles);

router.use((req, res, next) => {
  next(new NotFoundError({ message: NOT_FOUND }));
});

module.exports = router;
