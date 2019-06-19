import React, { Component } from 'react';
import logo from './images/book.svg';

class Nav extends Component {
    render() {
        return (
            <div className='nav-container'>
                <div className='margin-left'><img className='icon' src={logo} alt='book' width='35px' /></div>
                <div className='margin-left'><h5>Artbook</h5></div>
            </div>
        )
    }
}

export default Nav;