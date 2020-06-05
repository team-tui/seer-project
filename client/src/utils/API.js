import axios from 'axios';

export default {
    // Gets all books
    getBooks: function () {
        return axios.get('/api/books');
    },
    // Gets the book with the given id
    getBook: function (id) {
        return axios.get('/api/books/' + id);
    },
    // Deletes the book with the given id
    deleteBook: function (id) {
        return axios.delete('/api/books/' + id);
    },
    // Saves a book to the database
    saveBook: function (bookData) {
        return axios.post('/api/books', bookData);
    },

    // Deletes all books
    deleteAllBooks: function (id) {
        return axios.delete('/api/books/');
    },

     findByTitle (title, author) {
        return axios.create({headers: {"Content-type": "application/json"}
    }).get(`/api/books?title=${title}&author=${author}`);
      }, 

    findByTitle2: function (title, author, dateFrom, dateTo) {
        return axios.get('/api/books', 
        {params: { title: title,  author: author, dateFrom: dateFrom, dateTo: dateTo} })
    },

    create(data) {
        return axios.post("/api/books", data);
      }


};