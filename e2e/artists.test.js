const request = require('supertest');
const createApp = require('../server/app');
const { upSeed, downSeed } = require('./seeds/artists.seed');

describe('Tests for artists', () => {

  let app = null;
  let server = null;
  let api = null;

  beforeAll(async () => {
    app = createApp();
    server = app.listen(9000);
    api = request(app);
    await upSeed();
  });


  test('GET /', async () => {
    const getAll = await api.get('/api/v1/artists');
    expect(getAll.statusCode).toEqual(200);
    expect(getAll.body.length).toBeGreaterThan(1);
    expect(getAll.body).toBeDefined();
  });

  test('GET /{id}', async () => {
    const getById = await api.get('/api/v1/artists/2');
    expect(getById.statusCode).toEqual(200);
    expect(getById.body[0]).toBeDefined();
    expect(getById.body[0].name).toBeTruthy();
    expect(getById.body[0].id).toBeTruthy();
    expect(getById.body[0].createdat).toBeTruthy();
    expect(getById.body[0].updatedat).toBeTruthy();
  });

  test('GET /{id} bad request', async () => {
    const getById = await api.get('/api/v1/artists/10000');
    expect(getById.statusCode).toEqual(404);
    expect(getById.body[0]).toBeFalsy();
  });

  test('GET name/{name}', async () => {
    const getByName = await api.get('/api/v1/artists/name/El%20Cuarteto%20De%20Nos');
    expect(getByName.statusCode).toEqual(200);
    expect(getByName.body[0]).toBeDefined();
    expect(getByName.body[0].name).toBeTruthy();
    expect(getByName.body[0].id).toBeTruthy();
    expect(getByName.body[0].createdat).toBeTruthy();
    expect(getByName.body[0].updatedat).toBeTruthy();
  });

  test('GET name/{name} bad request', async () => {
    const getByName = await api.get('/api/v1/artists/name/Migagagaga');
    expect(getByName.statusCode).toEqual(404);
    expect(getByName.body[0]).toBeFalsy();
  });

  test('POST /', async () => {
    const postOne = await api.post('/api/v1/artists/').send({"name": "sera"});
    expect(postOne.statusCode).toEqual(201);
    expect(postOne.body.command).toEqual('INSERT')
  });

  test('POST / bad request', async () => {
    const postOne = await api.post('/api/v1/artists/').send({"nombress": "asdfasdfasdf"});
    expect(postOne.statusCode).toEqual(500);
    expect(postOne.body[0]).toBeFalsy();
  });

  test('DELETE /{id}', async () => {
    const deleteOne = await api.delete('/api/v1/artists/4');
    expect(deleteOne.statusCode).toEqual(204);
    expect(deleteOne.body[0]).toBeFalsy();
  });

  afterAll(async () => {
    await downSeed();
    server.close();
  });
});
