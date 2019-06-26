import React, { Component } from 'react'
import Modal from './Modal'

class Card extends Component {
    state = {
        isOpen: false
    }

    handleModalImg = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        const { pic, name } = this.props
        return (
            <div className='card-wrapper'>
                <div className='card'>
                    <img className='pic' src={pic} alt='img' onClick={this.handleModalImg} />
                    <p className='overflow-wrap' style={{ fontSize: 12.5 }}>{name}</p>
                    {this.state.isOpen && <Modal src={pic} onClick={this.handleModalImg} />}
                </div>
            </div>
        )
    }
}

export default Card
