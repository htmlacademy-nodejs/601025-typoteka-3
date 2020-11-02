'use strict';
const {HttpCode} = require(`../../constants`);
const articleKeys = [`title`, `announce`, `fullText`, `category`];

module.exports = {
  create: (req, res, next) => {
    const newArticle = req.body;
    const keys = Object.keys(newArticle);
    const keysExists = articleKeys.every((key) => keys.includes(key));

    if (!keysExists) {
      res.status(HttpCode.BAD_REQUEST)
        .send(`Bad request`);
    }

    next();
  },
  update: (req, res, next) => {
    const updatedArticle = req.body;
    const updatedArticleKeys = Object.keys(updatedArticle);
    const keysValid = updatedArticleKeys.every((key) => articleKeys.includes(key));

    if (!keysValid) {
      res.status(HttpCode.BAD_REQUEST)
        .send(`Bad request`);
    }

    next();
  }
};
