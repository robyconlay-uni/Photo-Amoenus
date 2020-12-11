const request = require('supertest');
const jwt     = require('jsonwebtoken'); // used to create, sign, and verify tokens
const locations     = require('./locations');
const mongoose = require('mongoose');
//const Location = require('./models/locationScheme');
const app = require('./app.js');
const validId = '5fd26394d14fa1313cd5f8ac';

let connection;

beforeAll(async () => {
  jest.setTimeout(8000);
  jest.unmock('mongoose');
  connection = await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Database connected!');
});

afterAll(() => {
  mongoose.connection.close(true);
  console.log("Database connection closed");
});

// create a valid token
var token = jwt.sign({
  username: 'fratm',
  email: "rob@gmail.com",
  password: "1234"
},
  process.env.JWT_KEY,
  { expiresIn: 86400 }
);

test('Locations module should be defined', () => {
  expect(locations).toBeDefined();
});

describe('GET /lib/locations initial', () => {
  test('GET / should return 200', () => {
      return request(app)
          .get('/locations')
          .expect('Content-Type', /json/)
          .expect(200);
  });
});

describe('GET /lib/locations/:locationId', function() {
  test('GET /validId responds with 200 json', function() {
    return request(app)
      .get('/locations/'+ validId)
      .expect('Content-Type', /json/)
      .expect(200);
  });
  test('GET /invalidId responds with 404 error, no valid entry', function() {
    return request(app)
      .get('/locations/invalidId000')
      .expect(404).expect({"message": 'No valid entry'});
  });
  test('GET /null responds with 500 error, null location Id', function() {
    return request(app)
      .get('/locations/'+'null')
      .expect(500);
  });
});

describe('POST locations/', function() {
  test('responds with json and 201, location created', function() {
    return request(app)
      .post('/locations/')
      .send(location = {
        //_id: new  mongoose.Types.ObjectId,
        name: 'Nothing',
        address: 'Nowhere',
        city: 'Idk',
        description: 'null',
        locationImage: 'uploads\\2020-12-6-1607268512678lemure-e1435405671562.jpg',      //array of IDs, with every id identifying an image
        category: 'Fantasy', 
        likes: 0,
        raggiungibilita: 'Piedi',
        photoDesc: 'NoPhDesc',
        hour: 'NoHour',
        date: 'NoDate',
      })
      .set({ Authorization: "Bearer " + token })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
  });
  /*it('responds with 500 error', function() {
    request(locations)
      .post('/')
      .send()
      .set('Accept', 'application/json')
      .expect(500)
  });*/
});