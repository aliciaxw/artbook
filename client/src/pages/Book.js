import React, { Component } from 'react'
import request from 'superagent'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import Content from '../components/Content'

class Book extends Component {
    state = {}

    componentDidMount() {
        this.getImages()
    }

    getImages = () => {
        request.get('/api/getDrawingsByDate')
            .then(res => {
                this.setState(res.body)
            })
    }

    render() {
        return (
            <div style={{ "position": "absolute", "top": 0, "bottom": 0, "left": 0, "right": 0 }}>
                <Nav />
                <div className='page'>
                    <Sidebar refreshImages={this.getImages} />
                    <Content images={this.state} />
                </div>
            </div>
        )
    }
}

export default Book
