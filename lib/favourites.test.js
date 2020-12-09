const request = require('supertest');
const app = require('./app.js')
const mongoose = require('mongoose');

describe('/lib/favourite testing', () => {

    let username = 'fratm';
    let email = "rob@gmail.com";
    let password = "1234";

    let correct_user_id = "5fb55d66616e891440543de5";
    let invalid_user_id = "5fb55d66616e89144054de5";
    let not_stored_user_id = "5fb55d66616e89144054de4e";

    test('GET /lib/favourites should return 200', () => {
        request(app)
            .post('/login')
            .send({"username": username, "email": email, "password": password})
            .then(res => {
                return request(app)
                    .get('/lib/favourites')
                    .send({Authorization: "Bearer " + res.token})
                    .expect('Content-Type', /json/)
                    .expect(200);
            });
    });

    test('GET /lib/favourites/:id should return 200', () => {
        return request(app)
            .get('/lib/favourites/' + correct_user_id)
            .expect('Content-Type', /json/)
            .expect(200);
    });

    test('GET /lib/favourites/:id with invalid id should return 500', () => {
        return request(app)
            .get('/lib/favourites/' + invalid_user_id)
            .expect('Content-Type', /json/)
            .expect(500)
            .expect(res => {
                res.body.message = "Invalid id"
            });
    });

    test('GET /lib/favourites/:id with valid but not stored id should return 404', () => {
        return request(app)
            .get('/lib/favourites/' + not_stored_user_id)
            .expect('Content-Type', /json/)
            .expect(404)
            .expect(res => {
                res.body.message = 'No valid user for favourites'
            });
    });

    test('POST /lib/favourites/:id with invalid id should return 500', () => {
        return request(app)
            .post('/lib/favourites/' + invalid_user_id)
            .expect('Content-Type', /json/)
            .expect(500)
            .expect(res => {
                res.body.message = "Invalid id"
            });
    });
    //check
    test('POST /lib/favourites/:id with valid but not stored id should return 500', () => {
        return request(app)
            .post('/lib/favourites/' + not_stored_user_id)
            .expect('Content-Type', /json/)
            .expect(500)
            .expect(res => {
                res.body.message = "Wrong User ID"
            });
    });

    /*
    successful POST request
    test('POST /lib/favourites/:id should return 201', () => {
        return request(app)
            .post('/lib/favourites/' + valid_user_id)
            .set('body', {
                "favourites": [ "5fbc0e06c318e940c00cd8e5", "5fbc155d3219e45b90d43c34"]
            })
            .expect('Content-Type', /json/)
            .expect(200);
    });
*/
    //empty body post

    test('POST /lib/favourites/:id with correct id but no body should return 500', () => {
        return request(app)
            .post('/lib/favourites/' + correct_user_id)
            .expect('Content-Type', /json/)
            .expect(500)
            .expect(res => {
                res.body.message = "Not enough information provided"
            });
    });

    //patch

    //delete

});


