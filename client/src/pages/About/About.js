
import React, { Component } from 'react';
import API from '../../utils/API';

class About extends Component {
    state = {
        books: [],
        title: '',
        author: ''
    };
    render() {
        return (
            <div>
                <h2>About</h2>
                <p>This is our About page. We are Team-Tui (7) and we are making the SEER application</p>

            </div>

        );
    }
}

export default About;