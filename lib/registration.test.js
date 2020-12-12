const request = require('supertest');
const jwt     = require('jsonwebtoken'); // used to create, sign, and verify tokens
const mongoose = require('mongoose');
const app = require('./app.js');
const User = require('./models/userScheme');
const registration = require('./registration.js');
const validIdNotReal = '5fd26394d14fa1313cd5f8ac';
const validId = '5fd4a2b14b72843bbc2220f2';

// Moking User.find method
let userSpy;
const fakeId = new mongoose.Types.ObjectId();


beforeAll( async () => {
  userSpy = jest.spyOn(User, 'find').mockImplementation((criterias) => {
    return [{
      _id: fakeId,
      username: 'fakeUser',
      email: 'fakemail@fake.mail',
      password: 'pass'
    }];
  });
  jest.setTimeout(8000);
  jest.unmock('mongoose');
  connection = await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Database connected!');
});

afterAll(async () => {
  userSpy.mockRestore();
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


test('Registration module should be defined', () => {
  expect(registration).toBeDefined();
});

/*describe('GET /lib/registration initial', () => {
  test('GET / should return 200, users found', () => {
      return request(app)
          .get('/user')
          .expect('Content-Type', /json/)
          .expect(200);
  });
});*/

describe('POST /signup', function() {
  
  test('responds with json and 201, user created', function() {
    return request(app)
      .post('/user/signup')
      .send({
        //_id: fakeId,
        username: 'fakeUser',
        email: 'fakemail2@fake.mail',
        password: 'pass'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201).expect('User created')
  });

/*  it('responds with 500 error, no password sent', function() {
    request(registration)
      .post('/signup')
      .set('Accept', 'application/json')
      .expect(500)
  });

  it('responds with 422 error, user already exists', function() {
    user1 = new User();
    user1.email == 'mail@fake.mail';
    request(registration)
      .post('/signup')
      .send({email: 'mail@fake.mail'})
      //.set(user.length, 1)
      .expect(422)
  });

  it('responds with 500 error, error in saving user', function() {
    error1 = new Error("Error in saving user");
    request(registration)
      .post('/signup')
      .send(error1)
      .expect(500).expect('Error in saving user')
  });*/

});

/*describe('POST /login', function() {
  
  it('responds with json and 200, auth successful', function() {
    request(registration)
      .post('/login')
      .send({
        email: 'fakemail@fake.mail',
        password: 'pass'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  });

  it('responds with 401 error, no mail or passwor sent', function() {
    request(registration)
      .post('/login')
      .set('Accept', 'application/json')
      .expect(401)
  });

  it('responds with 500 error, no user exists with this email', function() {
    request(registration)
      .post('/login')
      .send({ email: 'nuovamail@mail.it'})
      .set('Accept', 'application/json')
      .expect(500)
  });
})*/

describe('DELETE user/:id', function() {
  test('responds with json and 201, user deleted', function() {
    return request(app)
      .delete('/user/' + validId)
      .send({ _id: validId})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
  });

  test('responds with 404 error, no id specified', function() {
    return request(app)
      .delete('/user')
      .send()
      .set('Accept', 'application/json')
      .expect(404)
  });

})