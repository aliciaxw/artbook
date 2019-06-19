import React, { Component } from 'react'
import Day from './Day'
import Nav from './Nav'

class Book extends Component {
    state = {}

    render() {
        // const { groups } = this.state;
        return (
            <div>
                <Nav />
                <div className='small-container'>
                    <h1>Placeholder Name</h1>
                    <Day />
                    <Day />
                    <Day />
                </div>
            </div>
        )
    }
}

export default Book;
