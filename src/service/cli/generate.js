'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const {
  ExitCode,
  MAX_ID_LENGTH,
} = require(`../../constants`);
const {
  getRandomInt,
  shuffle
} = require(`../utils`);

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;
const MAX_COMMENTS = 4;

const DATE_RESTRICT = {
  min: 0,
  max: 90,
};

const getDate = () => {
  const newDate = new Date();
  newDate.setDate(newDate.getDate() - getRandomInt(DATE_RESTRICT.min, DATE_RESTRICT.max));
  return newDate.toISOString().replace(/T/, ` `).replace(/\..+/, ``);
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`).filter(Boolean);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const generatePublications = (count, titles, categories, sentences, comments) => {
  if (count > MAX_COUNT) {
    console.info(`Не больше 1000 публикаций`);
    process.exit(ExitCode.error);
  }
  return (
    Array(count).fill({}).map(() => ({
      id: nanoid(MAX_ID_LENGTH),
      title: titles[getRandomInt(0, titles.length - 1)],
      createDate: getDate(),
      announce: shuffle(sentences).slice(1, 5).join(` `),
      fullText: shuffle(sentences).slice(1, sentences.length - 1).join(` `),
      category: shuffle([...categories]).slice(getRandomInt(0, categories.length - 1)),
      comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
    }))
  );
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);
    const [count] = args;
    const countArticle = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generatePublications(countArticle, titles, categories, sentences, comments));
    try {
      await fs.writeFile(FILE_NAME, content);
      console.error(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};
