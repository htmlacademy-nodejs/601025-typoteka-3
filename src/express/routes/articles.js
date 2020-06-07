'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();

articlesRouter.get(`/:id`, (req, res) => res.render('pages/articles/post.pug'));
articlesRouter.get(`/category/:id`, (req, res) => res.render('pages/articles/articles-by-category.pug'));
articlesRouter.get(`/edit/:id`, (req, res) => res.render('pages/articles/post.pug'));
articlesRouter.get(`/add`, (req, res) => res.render('pages/articles/new-post.pug'));

module.exports = articlesRouter;
