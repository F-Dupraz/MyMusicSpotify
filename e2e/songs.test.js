const request = require('supertest');
const createApp = require('../server/app');
const { upSongsSeed, downSongsSeed } = require('./seeds/songs.seed');
const { upSeed, downSeed } = require('./seeds/artists.seed');

describe('Tests for songs', () => {

  let app = null;
  let server = null;
  let api = null;

  beforeAll(async () => {
    app = createApp();
    server = app.listen(9000);
    api = request(app);
    await upSeed();
    await upSongsSeed();
  });


  test('GET /', async () => {
    const getAll = await api.get('/api/v1/songs');
    expect(getAll.statusCode).toEqual(200);
    expect(getAll.body.length).toBeGreaterThan(1);
    expect(getAll.body).toBeDefined();
  });

  test('GET /{id}', async () => {
    const getById = await api.get('/api/v1/songs/4');
    expect(getById.statusCode).toEqual(200);
    expect(getById.body[0]).toBeDefined();
    expect(getById.body[0].name).toBeTruthy();
    expect(getById.body[0].artist).toBeTruthy();
  });

  test('GET /{id} bad request', async () => {
    const getById = await api.get('/api/v1/songs/10000');
    expect(getById.statusCode).toEqual(404);
    expect(getById.body[0]).toBeFalsy();
  });

  test('GET name/{name}', async () => {
    const getByName = await api.get('/api/v1/songs/name/Impermanence');
    expect(getByName.statusCode).toEqual(200);
    expect(getByName.body[0]).toBeDefined();
    expect(getByName.body[0].name).toBeTruthy();
    expect(getByName.body[0].artist).toBeTruthy();
  });

  test('GET name/{name} bad request', async () => {
    const getByName = await api.get('/api/v1/songs/name/Migagagaga');
    expect(getByName.statusCode).toEqual(404);
    expect(getByName.body[0]).toBeFalsy();
  });

  test('POST /', async () => {
    const postOne = await api.post('/api/v1/songs/').send({"trackName": "Mis amigosss", "artistName": "El Cuarteto De Nos"});
    expect(postOne.statusCode).toEqual(201);
    expect(postOne.body[0]).toBeDefined();
  });

  test('POST / bad request', async () => {
    const postOne = await api.post('/api/v1/songs/').send({"nombress": "asdfasdfasdf", "artstsid": 3});
    expect(postOne.statusCode).toEqual(500);
    expect(postOne.body[0]).toBeFalsy();
  });

  test('DELETE /{id}', async () => {
    const deleteOne = await api.delete('/api/v1/songs/11');
    expect(deleteOne.statusCode).toEqual(204);
    expect(deleteOne.body[0]).toBeFalsy();
  });

  afterAll(async () => {
    await downSeed();
    await downSongsSeed();
    server.close();
  });
});
