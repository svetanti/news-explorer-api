const Article = require('../models/article');
const BadRequestError = require('../errors/BadRequestError');
const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  BAD_REQUEST, FORBIDDEN, INTERNAL_SERVER_ERROR, ARTICLE_NOT_FOUND,
} = require('../constants');

module.exports.getArticles = (req, res, next) => {
  const owner = req.user._id;
  Article.find({ owner })
    .populate('user')
    .then((articles) => res.send({ data: articles }))
    .catch((err) => {
      throw new InternalServerError({ message: `${INTERNAL_SERVER_ERROR} ${err.message}` });
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, description, publishedAt, source, url, urlToImage,
  } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword, title, description, publishedAt, source, url, urlToImage, owner,
  })
    .catch((err) => {
      throw new BadRequestError({ message: `${BAD_REQUEST} ${err.message}` });
    })
    .then((article) => res.status(201).send({
      data: {
        keyword: article.keyword,
        title: article.title,
        description: article.description,
        publishedAt: article.publishedAt,
        source: article.source,
        url: article.url,
        urlToImage: article.urlToImage,
      },
    }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  const owner = req.user._id;
  const id = req.params._id;
  Article.findById(id, {
    keyword: 1,
    title: 1,
    description: 1,
    publishedAt: 1,
    source: 1,
    url: 1,
    urlToImage: 1,
    owner: 1,
  })
    .orFail()
    .catch(() => {
      throw new NotFoundError({ message: ARTICLE_NOT_FOUND });
    })
    .then((article) => {
      if (article.owner.toString() !== owner) {
        throw new ForbiddenError({ message: FORBIDDEN });
      }
      Article.findByIdAndDelete(id)
        .then((deletedArticle) => {
          res.send({ data: deletedArticle });
        })
        .catch(next);
    })
    .catch(next);
};
