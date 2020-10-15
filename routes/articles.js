const articles = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllres/articles');
const { validateId, validateArticle } = require('../middlewares/requestValidation');

articles.get('/articles', getArticles);
articles.post('/articles', validateArticle, createArticle);
articles.delete('/articles/:articleId', validateId, deleteArticle);

module.exports = articles;
