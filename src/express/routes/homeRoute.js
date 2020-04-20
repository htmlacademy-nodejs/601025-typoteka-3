'use strict';

const {Router} = require(`express`);
const homeRoute = new Router();

homeRoute.get(`/`, (req, res) => res.render('pages/main.pug'));
homeRoute.get(`/500`, (req, res) => res.render('pages/errors/500.pug'));
homeRoute.get(`/400`, (req, res) => res.render('pages/errors/400.pug'));

module.exports = homeRoute;
