const request = require('supertest');
const jwt     = require('jsonwebtoken'); // used to create, sign, and verify tokens
const locations     = require('./locations');
const mongoose = require('mongoose');
const Location = require('./models/locationScheme');
const databaseName = 'test';
const url = `mongodb://127.0.0.1/${databaseName}` ;
// Moking Location.find method
let locSpy;
// Moking Location.findById method
let locSpyFindById;

beforeAll( () => {
  locSpy = jest.spyOn(Location, 'find').mockImplementation((criterias) => {
    return [{
      id: '5fce5a03b140e827e053bf44',
      name: 'Nice Place',
      address: 'Nowhere',
      city: 'Idk',
      description: 'Nothing to say',
      locationImage: 'image.jpg',      //array of IDs, with every id identifying an image
      category: 'Fantasy', 
      likes: 0
    }];
  });
  locSpyFindById = jest.spyOn(Location, 'findById').mockImplementation((id) => {
    if (id=='5fce5a03b140e827e053bf44')
      return {
        id: '5fce5a03b140e827e053bf44',
        name: 'Nice Place',
        address: 'Nowhere',
        city: 'Idk',
        description: 'Nothing to say',
        locationImage: 'image.jpg',      //array of IDs, with every id identifying an image
        category: 'Fantasy', 
        likes: 0
      };
    else
      return {};
  });
});

afterAll(async () => {
  locSpy.mockRestore();
  locSpyFindById.mockRestore();
});

test('Locations module should be defined', () => {
  expect(locations).toBeDefined();
});

describe('POST locations/', function() {
  it('responds with json and 201, location created', function() {
    request(locations)
      .post('/')
      .send({
        _id: 111,
        name: "Nothing",
        address: "Nowhere",
        city: "Idk",
        description: "null",
        locationImage: "null.jpg",      //array of IDs, with every id identifying an image
        category: "Fantasy", 
        likes: 0
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
  });
  it('responds with 500 error', function() {
    request(locations)
      .post('/')
      .send()
      .set('Accept', 'application/json')
      .expect(500)
  });
});

describe('GET /', function() {
  it('responds with json', function() {
    request(locations)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});


describe('GET /:locationId', function() {
  it('responds with json', function() {
    request(locations)
      .get('/5fce5a03b140e827e053bf44')
      .expect('Content-Type', /json/)
      .expect(200);
  });
  it('responds with 404 error, no such Id exists', function() {
    request(locations)
      .get('/inexistentId000')
      .expect(404);
  });
  it('responds with 400 error, null location Id', function() {
    request(locations)
      .get('/null')
      .expect(400);
  });
  it('responds with 500 error, promise rejected', function() {
    request(locations)
      .get('/[null]')
      .expect(500);
  });
});