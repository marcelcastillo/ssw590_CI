const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { createApp } = require("../app");
const { connectToMongo, disconnectMongo } = require("../db");

let mongod;
let app;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  await connectToMongo(mongod.getUri());
  app = createApp();
});

afterAll(async () => {
  await disconnectMongo();
  if (mongod) await mongod.stop();
});

test("GET /health returns ok", async () => {
  const res = await request(app).get("/health");
  expect(res.status).toBe(200);
  expect(res.body).toEqual({ ok: true });
});

test("GET /visits starts at 0", async () => {
  const res = await request(app).get("/visits");
  expect(res.status).toBe(200);
  expect(res.body.visits).toBe(0);
});

test("POST /visits increments", async () => {
  const res1 = await request(app).post("/visits");
  expect(res1.status).toBe(200);
  expect(res1.body.visits).toBe(1);

  const res2 = await request(app).post("/visits");
  expect(res2.status).toBe(200);
  expect(res2.body.visits).toBe(2);

  const res3 = await request(app).get("/visits");
  expect(res3.body.visits).toBe(2);
});

