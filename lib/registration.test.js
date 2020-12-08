const request = require('supertest');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const registration = require('./registration');
const mongoose = require('mongoose');
const User = require("./models/userScheme");
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
});

afterAll(async () => {
  userSpy.mockRestore();
});

test('Registration module should be defined', () => {
  expect(registration).toBeDefined();
});

describe('POST /signup', function() {
  
  it('responds with json and 201, user created', function() {
    request(registration)
      .post('/signup')
      .send({
        _id: fakeId,
        username: 'fakeUser',
        email: 'fakemail@fake.mail',
        password: 'pass'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201).expect('User created')
  });

  it('responds with 500 error, no password sent', function() {
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
  });

});

describe('POST /login', function() {
  
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
})

describe('DELETE ./:id', function() {
  it('responds with json and 201, user deleted', function() {
    request(registration)
      .delete('./:id')
      .send({ id: fakeId})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
  });

  it('responds with 500 error, no user exists with this id', function() {
    request(registration)
      .delete('./:id')
      .send({ id: '000'})
      .set('Accept', 'application/json')
      .expect(500)
  });

})