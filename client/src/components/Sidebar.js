import React, { Component } from 'react'
import request from 'superagent'
import Table from '../components/Table'
import ArtistForm from '../components/ArtistForm'
import PageForm from '../components/PageForm'

const CLOUDINARY_UPLOAD_PRESET = 'artbook'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/aliciaxw/image/upload'


class Sidebar extends Component {
    state = {
        isPageFormOpen: false,
        isArtistFormOpen: false,
        leaderboard: []
    }

    componentDidMount() {
        this.getLeaderboard()
    }

    getLeaderboard = () => {
        console.log('get leaderboard')
        fetch('/api/getLeaderboard')
            .then(res => res.json())
            .then(leaderboard => this.setState({ ...this.state, leaderboard }))
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

    // Uploads the dropped image to Cloudinary
    submitPageForm = formState => {
        console.log('image upload')
        const image = formState.upload
        const { artist, pages, date } = formState

        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', image)

        upload.end((err, res) => {
            if (err) console.error(err)
            if (res.body.secure_url !== '') {
                request.post('/api/addDrawing/' + artist)
                    .send({ image: res.body.secure_url, pages: pages, date: date })
                    .then(() => this.getLeaderboard(), res => console.error(res))
            }
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
        }).then(res => this.getLeaderboard()) // retrieve table data
    }

    render() {
        const { isPageFormOpen, isArtistFormOpen, leaderboard } = this.state

        const { groups } = { groups: leaderboard }

        return (
            <div className='sidebar'>
                <table><tbody><tr>
                    <td><button onClick={this.toggleArtistForm}>Add artist</button></td>
                    <td><button onClick={this.togglePageForm}>Add page</button></td>
                </tr></tbody></table>
                {isPageFormOpen && <PageForm handleSubmit={this.submitPageForm} leaderboard={this.state.leaderboard} />}
                {isArtistFormOpen && <ArtistForm handleSubmit={this.submitArtistForm} />}
                <Table data={groups} />
            </div>
        )
    }
}

export default Sidebar
