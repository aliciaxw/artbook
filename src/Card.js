import React, { Component } from 'react'
// import pic from './images/sample.jpg'

class Card extends Component {
    render() {
        const { pic, name } = this.props
        return (
            <div className='card'>
                <img className='pic' src={pic} alt='pic' />
                <p className='overflow-wrap' style={{fontSize: 12.5}}>{name}</p>
            </div>
        )
    }
}

export default Card
