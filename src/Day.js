import React, { Component } from 'react'
import Card from './Card'
import pic1 from './images/sample.jpg'
import pic2 from './images/sample2.JPG'

class Day extends Component {
    render() {
        const { date } = this.props
        return (
            <div className='day'>
                    <h3>{date}</h3>
                    <div className='flex-row'>
                        <Card pic={pic1} name='ross'/>
                        <Card pic={pic2} name='afrooo'/>
                        <Card pic={pic1} name='ross'/>
                        <Card pic={pic1} name='ross'/>
                        <Card pic={pic2} name='afrooo'/>
                        <Card pic={pic2} name='afroo'/>
                        <Card pic={pic1} name='ross'/>
                    </div>
            </div>
        )
    }
}

export default Day