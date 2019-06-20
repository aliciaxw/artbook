import React, { Component } from 'react';
import logo from './images/image.png';

class Nav extends Component {
    render() {
        return (
            <div className='nav-container'>
                <div className='margin-left-large'><img className='icon' src={logo} alt='book' width='32px' /></div>
                <div className='margin-left-small'><h5>Artbook</h5></div>
            </div>
        )
    }
}

export default Nav;