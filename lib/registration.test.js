const request = require('supertest');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const registration = require('./registration');

test('Registration module should be defined', () => {
  expect(registration).toBeDefined();
});

/*test('GET / should return 200', () => {
  return request(app)
    .get('/')
    .expect(200);
});*/