import React, { Component } from 'react';
import API from '../../utils/API';

class Home extends Component {
    state = {
        books: [],
        title: '',
        author: ''
    };

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        API.getBooks()
            .then(res =>
                this.setState({ books: res.data, title: '', author: '' })
            )
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <h2>Home</h2>
                <p>This is our Home page. This will display a couple of Books once I get the DB working</p>
                {this.state.books.length ? (
                    this.state.books.map(book => (
                        <strong>
                            {book.title} by {book.author} <br></br>
                        </strong>
                    ))
                ) : (
                        <h3>No Results to Display</h3>
                    )}
            </div>

        );
    }
}

export default Home;