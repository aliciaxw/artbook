import React, { Component } from 'react'
import Table from '../components/Table'
import ArtistForm from '../components/ArtistForm'
import PageForm from '../components/PageForm'

class Sidebar extends Component {
    state = {
        isPageFormOpen: false,
        isArtistFormOpen: false,
        artists: []
    }

    componentDidMount() {
        this.getArtists()
    }

    getArtists = () => {
        console.log('get artists')
        fetch('/api/getArtists')
        .then(res => res.json())
        .then(artists => this.setState({ ...this.state, artists }))
    }

    togglePageForm = () => {
        if (this.state.isArtistFormOpen) {
            this.setState({ isArtistFormOpen: false, isPageFormOpen: !this.state.isPageFormOpen })
        } else {
            this.setState({ ...this.state, isPageFormOpen: !this.state.isPageFormOpen })
        }
    }

    toggleArtistForm = () => {
        if (this.state.isPageFormOpen) {
            this.setState({ isPageFormOpen: false, isArtistFormOpen: !this.state.isArtistFormOpen })
        } else {
            this.setState({ ...this.state, isArtistFormOpen: !this.state.isArtistFormOpen })
        }
    }

    submitPageForm = formState => {
        fetch('http://localhost:5000/api/addPage', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                artist: formState.artist,
            })
        })
    }

    submitArtistForm = formState => {
        console.log('submit artist form')
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
        console.log(this.state.artists)
    }

    render() {
        const { isPageFormOpen, isArtistFormOpen, artists } = this.state

        const leaderboard = {}
        artists.forEach(name => {
            leaderboard[name] = ['0']
        });
        const { groups } = { groups: leaderboard }

        return (
            <div className='sidebar'>
                <table><tbody><tr>
                    <td><button onClick={this.toggleArtistForm}>Add artist</button></td>
                    <td><button onClick={this.togglePageForm}>Add page</button></td>
                    </tr></tbody></table>
                {isPageFormOpen && <PageForm handleSubmit={this.submitPageForm} artists={this.state.artists} />}
                {isArtistFormOpen && <ArtistForm handleSubmit={this.submitArtistForm} />}
                <Table data={groups}/>
            </div>
        )
    }
}

export default Sidebar
