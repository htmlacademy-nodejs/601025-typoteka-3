'use strict';

const {Router} = require(`express`);
const articles = require(`../api/articles`);
const search = require(`../api/search`);

const getMockData = require(`../lib/get-mock-data`);

const {
  SearchService,
  ArticleService,
  CommentService,
} = require(`../data-service`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  search(app, new SearchService(mockData));
  articles(app, new ArticleService(mockData), new CommentService());
})();

module.exports = app;
