import React, { Component } from 'react'
import Card from './Card'
import pic1 from './images/sample.jpg'
import pic2 from './images/sample2.JPG'

class Day extends Component {
    render() {
        return (
            <div className='day'>
                    <h4>Wednesday June 19 2019</h4>
                    <div className='flex-row'>
                        <Card pic={pic1} name='ross'/>
                        <Card pic={pic2} name='afroooooooooooooooooooooooooooooooo'/>
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