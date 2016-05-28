import app from '../src/app';
import supertest from 'supertest';

const server = supertest.agent(app.listen());

describe('API Index', () => {
  it('should return API version', (done) => {
    server
      .get('/api')
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
  it('should return an array of users', (done) => {
    server
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.length.should.be.aboveOrEqual(1);
        done();
      });
  });
});

describe('POST /users', () => {
  it('should create a new user and return the new user record', (done) => {
    server
      .post('/api/users')
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

  it('should return a 400 if a name is not provided', (done) => {
    server
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send({ foo: 'bar'})
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('GET /users/:id', () => {
  it('should return a single user if found', (done) => {
    server
      .get('/api/users/1')
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
      .get('/api/users/0')
      .expect(404)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('GET /users/:id/projects', () => {
  it('should return an array of users projects', (done) => {
    server
      .get('/api/users/1/projects')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.length.should.be.aboveOrEqual(1);
        done();
      });
  });
});

describe('GET /projects', () => {
  it('should return an array of projects', (done) => {
    server
      .get('/api/projects')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.length.should.be.aboveOrEqual(1);
        done();
      });
  });
});

describe('POST /projects', () => {
  it('should create a new project and return the new project record', (done) => {
    server
      .post('/api/projects')
      .set('Content-Type', 'application/json')
      .send({ name: '100 Broadway'})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        var body = JSON.parse(res.text);
        body.should.have.ownProperty('id');
        body.should.have.ownProperty('name');
        body.name.should.equal('100 Broadway');
        done();
      });
  });

  it('should return a 400 if a name is not provided', (done) => {
    server
      .post('/api/projects')
      .set('Content-Type', 'application/json')
      .send({ foo: 'bar'})
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('GET /projects/:id', () => {
  it('should return a single project if found', (done) => {
    server
      .get('/api/projects/1')
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
      .get('/api/projects/0')
      .expect(404)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

