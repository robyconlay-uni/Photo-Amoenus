const request = require('supertest');
const jwt     = require('jsonwebtoken'); // used to create, sign, and verify tokens
const locations     = require('./locations');

test('Locations module should be defined', () => {
  expect(locations).toBeDefined();
});

test('GET / should return 200', () => {
  return request(locations)
    .get('/')
    .expect(200);
});