import React, { Component } from 'react'
import Card from './Card'

class Day extends Component {
    render() {
        let { date, images } = this.props
        date = new Date(date + ' EST').toDateString()
        return (
            <div className='day'>
                <h3>{date}</h3>
                <div className='flex-row'>
                    {images.map((img, index) => (
                        <Card key={index} pic={img.image} name={img.artist} />
                    ))}
                </div>
            </div>
        )
    }
}

export default Day
