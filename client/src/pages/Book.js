import React, { Component } from 'react'
import Day from '../components/Day'
import Nav from '../components/Nav'
import Table from '../components/Table'
import Form from '../components/Form'

class Book extends Component {
    state = {
        isFormOpen: false,
        artists: [],
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
            <div>
                <Nav />
                <div className='page'>
                    <div className='sidebar'>
                        <table><tbody><tr>
                            <td><button>Add artist</button></td>
                            <td><button onClick={this.toggleForm}>Add page</button></td>
                            </tr></tbody></table>
                        {this.state.isFormOpen && <Form handleSubmit={this.submitForm}/>}
                        <Table data={groups}/>

                    </div>
                    <div className='content'>
                        <div className='small-container'>
                            <h1>shame corner</h1>
                            <Day date="Thu 06/20/19" />
                            <Day date="Wed 06/19/19" />
                            <Day date="Tue 06/18/19" />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Book;
