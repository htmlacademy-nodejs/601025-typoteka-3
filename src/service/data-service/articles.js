'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class ArticlesService {
  constructor(articles) {
    this._articles = articles;
  }

  create(article) {
    const dateOptions = {
      year: `numeric`,
      month: `numeric`,
      day: `numeric`,
      hour: `numeric`,
      minute: `numeric`,
      second: `numeric`
    };
    const createdDate = new Date().toLocaleDateString(`Ru-ru`, dateOptions);
    const newArticle = Object
      .assign({id: nanoid(MAX_ID_LENGTH), comments: [], createDate: createdDate,
      }, article);

    this._articles.push(newArticle);
    return newArticle;
  }

  drop(id) {
    const article = this._articles.find((item) => item.id === id);

    if (!article) {
      return null;
    }

    this._articles = this._articles.filter((item) => item.id !== id);
    return article;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((item) => item.id === id);
  }

  update(id, article) {
    const olArticle = this._articles
      .find((item) => item.id === id);

    return Object.assign(olArticle, article);
  }

}

module.exports = ArticlesService;
