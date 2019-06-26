import React, { Component } from 'react'
import Day from '../components/Day'

class Content extends Component {
    render() {
        const { images } = this.props
        return (
            <div className='content'>
                <div className='small-container'>
                    <h1>shame corner</h1>
                    <div>
                        {Object.keys(images).sort().reverse().map(date => (
                            <Day key={date} date={date} images={images[date]} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Content
