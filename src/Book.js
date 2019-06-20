import React, { Component } from 'react'
import Day from './Day'
import Nav from './Nav'
import Table from './Table'

class Book extends Component {
    state = {}

    render() {
        const { groups } = { groups: {} };
        return (
            <div>
                <Nav />
                <div className='page'>
                    <div className='sidebar'>
                        <Table data={groups}/>
                    </div>
                    <div className='content'>
                        <div className='small-container'>
                            <h1>Placeholder Name</h1>
                            <Day />
                            <Day />
                            <Day />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Book;
