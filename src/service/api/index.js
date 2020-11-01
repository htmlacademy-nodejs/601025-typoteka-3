'use strict';

const {Router} = require(`express`);
const articles = require(`./articles/articles`);
const search = require(`./search/search`);

const {getMockData} = require(`../lib/get-mock-data`);

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
