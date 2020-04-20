'use strict';

const path = require('path');
const express = require(`express`);
const homeRoute = require('./routes/homeRoute');
const searchRoutes = require(`./routes/search`);
const myRoutes = require(`./routes/my`);
const loginRoutes = require(`./routes/login`);
const articlesRoutes = require(`./routes/articles`);
const registerRoutes = require(`./routes/register`);

const STATIC_DIR = path.join(__dirname, `./../../markup`);

const app = express();
const port = 8080;

app.set(`view engine`, `pug`);
app.set(`views`, path.join(__dirname, `./templates`));

app.use(`/`, homeRoute);
app.use(`/login`, loginRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);
app.use(`/register`, registerRoutes);
app.use(`/search`, searchRoutes);

app.use(express.static(STATIC_DIR));

app.listen(port);
