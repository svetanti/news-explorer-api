const BAD_REQUEST = 'Указаны некорректные данные:';
const CONFLICT = 'Пользователь с таким email уже зарегистрирован';
const FORBIDDEN = 'Недостаточно прав для выполнения операции';
const INTERNAL_SERVER_ERROR = 'На сервере произошла ошибка:';
const NOT_FOUND = 'Ресурс не найден';
const ARTICLE_NOT_FOUND = 'Статья не найдена';
const UNAUTHORIZED = 'Необходима авторизация';
const SUCCESS = 'Успешная авторизация';
const LIMITER_MESSAGE = 'Слишком много запросов с вашего IP, попробуйте повторить попытку позже';

module.exports = {
  BAD_REQUEST,
  CONFLICT,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  ARTICLE_NOT_FOUND,
  UNAUTHORIZED,
  SUCCESS,
  LIMITER_MESSAGE,
};
