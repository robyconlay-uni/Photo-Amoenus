const request = require('supertest');
const app = require('./app.js')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


let connection;

beforeAll(async () => {
    jest.setTimeout(8000);
    jest.unmock('mongoose');
    connection = await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connected!');
    //return connection; // Need to return the Promise db connection?
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

//console.log(token);


// maybe get a random location from database?

describe('GET /lib/favourite initial', () => {

    test('GET /all should return 200', () => {
        return request(app)
            .get('/lib/favourites/all')
            .expect('Content-Type', /json/)
            .expect(200);
    });

    test('GET with token of user with no favourites should return 404', () => {
        return request(app)
            .get('/lib/favourites')
            .set({ Authorization: "Bearer " + token })
            .expect('Content-Type', /json/)
            .expect(404);
    });

    test('GET without token should return 401', () => {
        return request(app)
            .get('/lib/favourites')
            .expect('Content-Type', /json/)
            .expect(401, { message: 'Auth failed' });
    });
});

describe('add favourites and get them', () => {

    let locationId = "5fccb2708091664c681e016a";

    test('/add/:id should return 200', () => {
        return request(app)
            .patch('/lib/favourites/add/' + locationId)
            .set({ Authorization: "Bearer " + token })
            .expect('Content-Type', /json/)
            .expect(200, { message: "Favourite added with success" });
    });

    test('/add/:id of location already in user\'s favourites should return 409', () => {
        return request(app)
            .patch('/lib/favourites/add/' + locationId)
            .set({ Authorization: "Bearer " + token })
            .expect('Content-Type', /json/)
            .expect(409, { message: "Location is already in user's favourites" });
    });

    test('GET with token and user has faourites should return 200', () => {
        return request(app)
            .get('/lib/favourites')
            .set({ Authorization: "Bearer " + token })
            .expect('Content-Type', /json/)
            .expect(200);
    });

});

describe('remove favourites', () => {

    let locationId = "5fbc0e06c318e940c00cd8e5";

    test('/remove/:id should return 200', () => {
        return request(app)
            .patch('/lib/favourites/remove/' + locationId)
            .set({ Authorization: "Bearer " + token })
            .expect('Content-Type', /json/)
            .expect(200, { message: 'Favourite deleted for user' });
    });

    test('/remove/:id of location already deleted from user\'s favourites should return 200', () => {
        return request(app)
            .patch('/lib/favourites/remove/' + locationId)
            .set({ Authorization: "Bearer " + token })
            .expect('Content-Type', /json/)
            .expect(200, { message: 'Favourite deleted for user' });
    });

    test('DELETE with token should return 200', () => {
        return request(app)
            .delete('/lib/favourites/')
            .set({ Authorization: "Bearer " + token })
            .expect('Content-Type', /json/)
            .expect(200, { message: 'All favourite of a user deleted' });
    });
});


