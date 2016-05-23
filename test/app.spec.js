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
        res.status.should.equal(200);
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
        res.status.should.equal(200);
        res.body.length.should.be.aboveOrEqual(1);
        done();
      });
  });
});

describe('GET /users/:id', () => {
  it('should return a single user as json', (done) => {
    server
      .get('/users/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.status.should.equal(200);
        res.body.id.should.equal(1);
        res.body.should.have.ownProperty('name');
        done();
      });
  });
});

