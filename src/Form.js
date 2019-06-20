import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            artist: '',
            date: '',
            pages: 1,
        };

        this.state = this.initialState;
    }

    // updates input value on change
    handleChangeArtist = event => {
        const { value } = event.target;
        this.setState({
            ...this.state,
            artist: value,
        })
    }

    handleChangeDate = event => {
        const { value } = event.target;
        this.setState({
            ...this.state,
            date: value,
        })
    }

    handleChangePages = event => {
        const { value } = event.target;
        this.setState({
            ...this.state,
            pages: value,
        })
    }

    submitForm = () => {
        this.props.handleSubmit(this.state); // adds person to App state
        this.setState(this.initialState); // clears Form state
    }

    render() {
        const { artist, date, pages } = this.state;
        return (
            <table><tr><td>
            <h2>Add new page</h2>
            <form>
                <label>Artist</label>
                <input
                    type="text"
                    name="artist"
                    value={artist}
                    onChange={this.handleChangeArtist} />
                <label>Date</label>
                <input
                    type="date"
                    name="date"
                    value={date}
                    onChange={this.handleChangeDate} />
                <label>Pages</label>
                <input
                    type="number"
                    name="pages"
                    value={pages}
                    onChange={this.handleChangePages} />
                <input type='button' value='Submit' onClick={this.submitForm} />
            </form>
            </td></tr></table>
        )
    }
}

export default Form;
