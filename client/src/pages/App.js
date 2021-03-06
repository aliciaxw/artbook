import React, { Component } from 'react'
import Table from '../components/Table'
import Form from '../components/Form'
import Nav from '../components/Nav'

/* Plan for creating new books. Far off TODO */
class App extends Component {
    state = {
        groups: {}, // map of groups to list of members
    }

    // takes in Form state
    addGroup = formState => {
        this.setState({
            groups: { ...this.state.groups, [formState.name]:['wang', 'wangers', 'mango'] } // temp hardcoded data
        })
    }

    render() {
        const { groups } = this.state
        return (
            <div>
                <Nav />
                <div className='small-container'>
                    <h1>Artbook</h1>
                    <p>Engage in some friendly banter with your artist friends.</p>
                    <Table data={groups} />
                    <h3>New book</h3>
                    <Form handleSubmit={this.addGroup} />
                </div>
            </div>
        )
    }
}

export default App
