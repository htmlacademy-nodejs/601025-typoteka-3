'use strict';

const errorsRoutes = require(`./errors`);
const homeRoute = require(`./homeRoute`);
const loginRoutes = require(`./login`);
const myRoutes = require(`./my`);
const articlesRoutes = require(`./articles`);
const registerRoutes = require(`./register`);
const searchRoutes = require(`./search`);
const categoriesRoutes = require(`./categories`);

module.exports = {
  categoriesRoutes,
  homeRoute,
  errorsRoutes,
  loginRoutes,
  myRoutes,
  articlesRoutes,
  registerRoutes,
  searchRoutes,
};
