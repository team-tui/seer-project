let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server');
let should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);

describe('*********** BOOKS ***********', () => {
    describe('/GET Request to Get All Books', () => {
        it('Should get an Array of Books', (done) => {
            chai
                .request(app)
                .get('/api/books')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    done();
                })
        }).timeout(5000)
    })

    describe('/POST Request should add a new Book', () => {
        it('Should add a new book called Mocha Book', (done) => {
            const book = {
                title: "Mocha Book",
                author: "Mocha Book Author"
            }
            chai
                .request(app)
                .post('/api/books')
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a.property('_id')
                    res.body.should.be.a.property('title')
                    res.body.should.be.a.property('author')
                    id = res.body._id
                    done();
                })
        })
    })

    describe('/GET Request should return Mocha Book', () => {
        it('Should return book called Mocha Book', (done) => {
            chai
                .request(app)
                .get('/api/books/' + id)
                .end((err, res) => {
                    res.body.should.be.a.property('_id')
                    res.body.should.be.a.property('title')
                    res.body.should.be.a.property('author')
                    res.body._id.should.equal(id)
                    done()
                })
        })
    })


    describe('/PATCH Request should update Mocha Book', () => {
        it('Should change author but return origial author', (done) => {
            const patchbook = {
                author: "New Author"
            }
            chai
                .request(app)
                .put('/api/books/' + id)
                .send(patchbook)
                .end((err, res) => {
                    res.body.should.be.a.property('_id')
                    res.body.should.be.a.property('title')
                    res.body.should.be.a.property('author')
                    res.body.author.should.equal('Mocha Book Author')
                    done()
                })
        })
    })

    describe('/DELETE Request should remove Mocha Book', () => {
        it('Should remove book called Mocha Book', (done) => {
            chai
                .request(app)
                .delete('/api/books/' + id)
                .end((err, res) => {
                    res.body.should.be.a.property('_id')
                    res.body.should.be.a.property('title')
                    res.body.should.be.a.property('author')
                    res.body._id.should.equal(id)
                    done()
                })
        })
    })



})

after(() => {
    app.server.close(() => {
        app.mongoose.connection.close();
    });
});



