import app from '../src/app';
import supertest from 'supertest';

const server = supertest.agent(app.listen());

describe('API Index', () => {
  it('should return API version', (done) => {
    server
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.api.should.equal('v1.0');
        done();
      });
  });
});

describe('GET /users', () => {
  it('should return an array of users as json', (done) => {
    server
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.length.should.be.aboveOrEqual(1);
        done();
      });
  });
});

describe('GET /users/:id', () => {
  it('should return a single user as json if found', (done) => {
    server
      .get('/users/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.id.should.equal(1);
        res.body.should.have.ownProperty('name');
        done();
      });
  });

  it('should return a 404 when user not found', (done) => {
    server
      .get('/users/0')
      .expect(404)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /users', () => {
  it('should create a new user and return the new user record', (done) => {
    server
      .post('/users')
      .set('Content-Type', 'application/json')
      .send({ name: 'George Washington'})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        var body = JSON.parse(res.text);
        body.should.have.ownProperty('id');
        body.should.have.ownProperty('name');
        body.name.should.equal('George Washington');
        done();
      });
  });
});

