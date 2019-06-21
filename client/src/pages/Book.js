import React, { Component } from 'react'
import Day from '../components/Day'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'

class Book extends Component {
    render() {
        return (
            <div>
                <Nav />
                <div className='page'>
                    <Sidebar />
                    <Content />
                </div>
            </div>
        )
    }
}

const Content = () => {
    return (
        <div className='content'>
            <div className='small-container'>
                <h1>shame corner</h1>
                <Day date="Thu 06/20/19" />
                <Day date="Wed 06/19/19" />
                <Day date="Tue 06/18/19" />
            </div>
        </div>
    )
}

export default Book
