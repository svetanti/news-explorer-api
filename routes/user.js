const user = require('express').Router();
const { getUser } = require('../controllres/user');

user.get('/users/me', getUser);

module.exports = user;
