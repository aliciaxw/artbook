import React, { Component } from 'react'
import Table from '../components/Table'
import Form from '../components/Form'

class Sidebar extends Component {
    state = {
        isFormOpen: false,
        artists: []
    }

    componentDidMount() {
        this.getArtists()
    }

    getArtists = () => {
        console.log('get artists')
        fetch('/api/getArtists')
        .then(res => res.json())
        .then(artists => this.setState({ artists }))
    }

    toggleForm = () => {
        this.setState({ isFormOpen: !this.state.isFormOpen })
    }

    submitForm = formState => {
        console.log('form submitted');
        fetch('http://localhost:5000/api/addArtist', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                artist: formState.artist,
            })
        }).then(res => this.getArtists()) // retrieve table data
    }

    render() {
        const { artists } = this.state

        const leaderboard = {}
        artists.forEach(name => {
            leaderboard[name] = ['0']
        });
        const { groups } = { groups: leaderboard }

        return (
            <div className='sidebar'>
                <table><tbody><tr>
                    <td><button>Add artist</button></td>
                    <td><button onClick={this.toggleForm}>Add page</button></td>
                    </tr></tbody></table>
                {this.state.isFormOpen && <Form handleSubmit={this.submitForm} artists={this.state.artists}/>}
                <Table data={groups}/>
            </div>
        )

    }
}

export default Sidebar
