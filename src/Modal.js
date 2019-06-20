import React, { Component } from 'react'

class Modal extends Component {
    render() {
        const { src, onClick } = this.props
        return (
            <div className='backdrop' onClick={onClick}>
                <img className='modal' src={src} alt='img' />
            </div>
        )
    }
}

export default Modal