'use strict';

const request = require(`supertest`);
const server = require(`../../../express`);

const {HttpCode} = require(`../../../constants`);
const {getMockData} = require(`../../../service/lib/get-mock-data`);

let mocks = [];

describe(`Тестирование API по маршруту articles`, () => {
  beforeAll(async () => {
    mocks = await getMockData();
  });

  test(`Get /api/articles expected to have HttpCode 200 and mock in response`, async () => {
    const res = await request(server).get(`/api/articles`);

    expect(res.statusCode).toBe(HttpCode.OK);
    expect(res.body).toMatchObject(mocks);

  });

  test(`Get /api/articles expected to have HttpCode 404`, async () => {
    const res = await request(server).get(`/api/affirs`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`GET /api/articles/:articleId expected to have HttpCode 200 and valid article`, async () => {
    const ITEM_INDEX = 0;
    const res = await request(server).get(`/api/articles/${mocks[ITEM_INDEX].id}`);

    expect(res.statusCode).toBe(HttpCode.OK);
    expect(res.body).toMatchObject(mocks[ITEM_INDEX]);
  });

  test(`GET /api/articles/:articleId expected to have HttpCode 404`, async () => {
    const res = await request(server).get(`/api/articles/ggbTffRScb`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`POST /api/articles`, async () => {
    const newArticle = {
      "title": `Test title`,
      "announce": `Test announse`,
      "fullText": `Test text`,
      "category": [
        `Деревья`,
        `IT`,
        `Без рамки`,
        `За жизнь`,
        `Музыка`,
        `Железо`
      ],
    };

    const res = await request(server)
      .post(`/api/articles`)
      .send(newArticle);
    expect(res.statusCode).toBe(HttpCode.CREATED);
    expect(res.body).toBe(res.body);
    const newArticleId = res.body.id;

    const createdArticlesRes = await request(server).get(`/api/articles/${newArticleId}`);
    expect(createdArticlesRes.statusCode).toBe(HttpCode.OK);
    expect(res.body.title).toBe(newArticle.title);
    expect(res.body.announce).toBe(newArticle.announce);
    expect(res.body.fullText).toBe(newArticle.fullText);
    expect(res.body.category).toMatchObject(newArticle.category);
    expect(res.body.category).hasOwnProperty(`createdDate`);
    expect(res.body.category).hasOwnProperty(`comments`);
  });

  test(`PUT /api/articles/:articleId expected to have HttpCode 200`, async () => {
    const articlePayload = {
      "title": `Test title`,
      "announce": `Test announse`,
      "fullText": `Test text`,
      "category": [
        `Деревья`,
        `IT`,
        `Без рамки`,
        `За жизнь`,
        `Музыка`,
        `Железо`
      ],
    };
    const ITEM_INDEX = 0;
    const res = await request(server)
      .put(`/api/articles/${mocks[ITEM_INDEX].id}`)
      .send(articlePayload);
    expect(res.statusCode).toBe(HttpCode.OK);

    const editedArticleRes = await request(server).get(`/api/articles/${mocks[ITEM_INDEX].id}`);
    expect(editedArticleRes.statusCode).toBe(HttpCode.OK);
    expect(articlePayload.title).toBe(editedArticleRes.body.title);
    expect(articlePayload.announce).toBe(editedArticleRes.body.announce);
    expect(articlePayload.fullText).toBe(editedArticleRes.body.fullText);
    expect(articlePayload.category).toMatchObject(editedArticleRes.body.category);
  });

  test(`PUT /api/articles/:articleId expected to have HttpCode 404`, async () => {
    const res = await request(server)
      .put(`/api/articles/DgDbnwnsj`)
      .send({title: `Jest test`});
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`DELETE /api/articles/:articleId expected to have HttpCode 200`, async () => {
    const ITEM_INDEX = 3;
    const getRes = await request(server).get(`/api/articles/${mocks[ITEM_INDEX].id}`);
    expect(getRes.statusCode).toBe(HttpCode.OK);

    const res = await request(server).delete(`/api/articles/${mocks[ITEM_INDEX].id}`);
    expect(res.statusCode).toBe(HttpCode.OK);

    const deletedOfferRes = await request(server).get(`/api/articles/${mocks[ITEM_INDEX].id}`);
    expect(deletedOfferRes.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`DELETE /api/articles/:articleId expected to have HttpCode 404`, async () => {
    const res = await request(server).delete(`/api/articles/GGffDDEE;;kkdn`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`GET /api/articles/:articleId/comments expected to have HttpCode 200`, async () => {
    const ITEM_INDEX = 1;
    const res = await request(server).get(`/api/articles/${mocks[ITEM_INDEX].id}/comments`);
    expect(res.statusCode).toBe(HttpCode.OK);

    expect(res.body).toMatchObject(mocks[ITEM_INDEX].comments);
  });

  test(`GET /api/articles/:articleId/comments expected to have HttpCode 404`, async () => {
    const res = await request(server).get(`/api/articles/vffeveveYYffccnn/comments`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`GET /api/articles/:articleId/comments/:commentId expected to have HttpCode 200`, async () => {
    const ITEM_INDEX = 1;
    const COMMENT_INDEX = 0;
    const res = await request(server).get(`/api/articles/${mocks[ITEM_INDEX].id}/comments/${mocks[ITEM_INDEX].comments[COMMENT_INDEX].id}`);
    expect(res.statusCode).toBe(HttpCode.OK);

    expect(res.body).toMatchObject(mocks[ITEM_INDEX].comments[COMMENT_INDEX]);
  });

  test(`DELETE /api/articles/:articleId/comments/:commentId expected to have 200, comment expected to be removed`, async () => {
    const ITEM_INDEX = 2;
    const COMMENT_INDEX = 0;
    const res = await request(server).delete(`/api/articles/${mocks[ITEM_INDEX].id}/comments/${mocks[ITEM_INDEX].comments[COMMENT_INDEX].id}`);
    expect(res.statusCode).toBe(HttpCode.OK);

    const updatedCommentsRes = await request(server).get(`/api/articles/${mocks[ITEM_INDEX].id}/comments/${mocks[ITEM_INDEX].comments[COMMENT_INDEX].id}`);
    expect(updatedCommentsRes.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`DELETE /api/articles/:articleId/comments/:commentId expected to have HttpCode 404`, async () => {
    const res = await request(server).delete(`/api/articles/${mocks[2].id}/comments/sdghfdhtyrj`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`POST /api/articles/:articleId/comments expected to have HttpCode 201`, async () => {
    const OFFER_INDEX = 4;
    const newComment = `Jest test post comment`;
    const res = await request(server)
      .post(`/api/articles/${mocks[OFFER_INDEX].id}/comments`)
      .send({text: newComment});
    expect(res.statusCode).toBe(HttpCode.CREATED);
    const newCommentId = res.body.id;
    const newCommentsRes = await request(server).get(`/api/articles/${mocks[OFFER_INDEX].id}/comments`);
    expect(newCommentsRes.body).toContainEqual({id: newCommentId, text: newComment});

  });

  test(`POST /api/articles/:articleId/comments expected to have HttpCode 404`, async () => {
    const res = await request(server)
      .post(`/api/articles/${mocks[4].id}/CAMENTSss`)
      .send({text: `Jest test post comment`});
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

});
