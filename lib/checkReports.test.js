const request = require('supertest');
const jwt     = require('jsonwebtoken'); // used to create, sign, and verify tokens
const locations     = require('./locations');
const mongoose = require('mongoose');
//const Location = require('./models/locationScheme');
const app = require('./app.js');
const validIdNotReal = '5fd26394d14fa1313cd5f8ac';
const validId = '5fd3945a9fd1a230ecd2b152';


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


describe('GET /lib/checkReports initial', () => {
    test('GET / should return 200', () => {
        return request(app)
            .get('/checkReports')
            .expect('Content-Type', /json/)
            .expect(200);
    });
  });
  