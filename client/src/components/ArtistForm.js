import React, { Component } from 'react'

class ArtistForm extends Component {
    constructor(props) {
        super(props)

        this.initialState = {
            artist: ''
        }

        this.state = this.initialState
    }

    // updates input value on change
    handleChangeArtist = event => {
        const { value } = event.target
        this.setState({ artist: value })
    }

    submitForm = () => {
        this.props.handleSubmit(this.state) // adds person to App state
        this.setState(this.initialState) // clears Form state
    }

    render() {
        const { artist } = this.state

        return (
            <div>
                <h2>Add new artist</h2>
                <form>
                    <label>Name</label>
                    <input
                        type="text"
                        name="artist"
                        value={artist}
                        onChange={this.handleChangeArtist} />

                    <input type='button' value='Submit' onClick={this.submitForm} />
                </form>
            </div>
        )
    }
}

export default ArtistForm
