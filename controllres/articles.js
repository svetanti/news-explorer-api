const Article = require('../models/article');
const BadRequestError = require('../errors/BadRequestError');
const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .populate('user')
    .then((articles) => res.status(200).send({ data: articles }))
    .catch((err) => {
      throw new InternalServerError({ message: `На сервере произошла ошибка: ${err.message}` });
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .catch((err) => {
      throw new BadRequestError({ message: `Указаны некорректные данные при создании карточки: ${err.message}` });
    })
    .then((article) => res.status(201).send({ data: article }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findByIdAndDelete(req.params._id)
    .orFail()
    .catch(() => {
      throw new NotFoundError({ message: 'Нет статьи с таким id' });
    })
    .then((articleData) => {
      res.send({ data: articleData });
    })
    .catch(next);
};
