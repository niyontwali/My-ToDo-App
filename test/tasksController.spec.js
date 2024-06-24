const chai = require('chai');
const chaiHTTP = require('chai-http');
const {app} = require('../src/app');
const { newTask, updateTask, emptyTask } = require('../testData/data');

chai.should();
chai.use(chaiHTTP);

describe('Tasks CRUD operations', () => {
  it('Create a new task', (done) => {
    chai
    .request(app)
    .post('/tasks')
    .send(newTask)
    .end((err, res) => {
        if (err) console.log(err.message);
        res.should.have.a.status(200);
        res.body.should.be.an('object');
        res.body.should.have.a.property('data');
        res.body.should.have.a.property('message');
        res.body.message.should.be.equal('Task successfully added')
        res.body.data.should.have.a.property('id');
      done();
    });
  });

  it('can not create a new task', (done) => {
    chai
    .request(app)
    .post('/tasks')
    .send(emptyTask)
    .end((err, res) => {
        if (err) console.log(err.message);
        res.should.have.a.status(400);
        res.body.should.be.an('object');
        res.body.should.have.a.property('message');
        res.body.message.should.be.equal('The task can not be empty!')
      done();
    });
  });

  it('get all task', (done) => {
    chai
    .request(app)
    .get('/tasks')
    .end((err, res) => {
      if (err) console.log(err.message);
      res.should.have.a.status(200);
      res.body.should.have.a.property('data');
      res.body.data.should.be.an('array');
      done()
    })
  })

  it('Update task' ,(done) => {
    chai
    .request(app)
    .get('/tasks')
    .end((err, res) => {
      if (err) console.log(err.message);
      const id = res.body.data[0].id
    chai
    .request(app)
    .put(`/tasks/${id}`)
    .send(updateTask)
    .end((err, res) => {
      if (err) console.log(err.message);
      res.should.have.a.status(200);
      res.body.should.be.an('object');
      res.body.should.have.a.property('updatedTask');
      res.body.should.have.a.property('message');
      res.body.message.should.be.equal('Successfully updated')
      done();
    });
  })
  })

  it('Should not Update a task with id that does not exist' ,(done) => {
    chai
    .request(app)
    .get('/tasks')
    .end((err, res) => {
      if (err) console.log(err.message);
      const id = 100
      // const len = res.body.data.length
      // const id = len+2
    chai
    .request(app)
    .put(`/tasks/${id}`)
    .send(updateTask)
    .end((err, res) => {
      if (err) console.log(err.message);
      res.should.have.a.status(400);
      res.body.should.be.an('object');
      res.body.should.have.a.property('error');
      res.body.error.should.be.equal('Sorry, the id entered does not exist or its not a number!')
      done();
    });
  })
  })

  it('Should not Update a task with id that is not an number' ,(done) => {
    chai
    .request(app)
    .get('/tasks')
    .end((err, res) => {
      if (err) console.log(err.message);
      const id = 'aaaaa'
    chai
    .request(app)
    .put(`/tasks/${id}`)
    .send(updateTask)
    .end((err, res) => {
      if (err) console.log(err.message);
      res.should.have.a.status(400);
      res.body.should.be.an('object');
      res.body.should.have.a.property('error');
      res.body.error.should.be.equal('Sorry, the id entered does not exist or its not a number!')
      done();
    });
  })
  })

  it('Delete task' ,(done) => {
    chai
    .request(app)
    .get('/tasks')
    .end((err, res) => {
      if (err) console.log(err.message);
      const id = res.body.data[0].id
    chai
    .request(app)
    .delete(`/tasks/${id}`)
    .end((err, res) => {
      if (err) console.log(err.message);
      res.should.have.a.status(200);
      res.body.should.be.an('object');
      res.body.should.have.a.property('message');
      res.body.message.should.be.equal('Task successfull deleted')
      done();
    });
  })
  })

  it('Should not delete a task with id that does not exist' ,(done) => {
    chai
    .request(app)
    .get('/tasks')
    .end((err, res) => {
      if (err) console.log(err.message);
      const id =100
      // const len = res.body.data.length
      // const id = len+2
    chai
    .request(app)
    .delete(`/tasks/${id}`)
    .end((err, res) => {
      if (err) console.log(err.message);
      res.should.have.a.status(404);
      res.body.should.be.an('object');
      res.body.should.have.a.property('message');
      res.body.message.should.be.equal('No data to be deleted matching the id')
      done();
    });
  })
  })

})