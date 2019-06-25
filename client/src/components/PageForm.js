import React, { Component } from 'react'

class PageForm extends Component {
    constructor(props) {
        super(props)

        const curDate = new Date()
        const yyyy = curDate.getFullYear()
        const mm = ("0" + (curDate.getMonth()+1)).slice(-2)
        const dd = ("0" + curDate.getDate()).slice(-2)
        const curDateStr = yyyy + '-' + mm + '-' + dd

        const name = props.leaderboard.length!==0 ? props.leaderboard[0][0] : ''

        this.initialState = {
            artist: name,
            date: curDateStr,
            pages: 1,
            upload: '../images/test.jpg',
        }

        this.state = this.initialState
    }

    // updates input value on change
    handleChangeArtist = event => {
        const { value } = event.target
        this.setState({
            ...this.state,
            artist: value,
        })
    }

    handleChangeDate = event => {
        const { value } = event.target
        this.setState({
            ...this.state,
            date: value,
        })
    }

    handleChangePages = event => {
        let { value } = event.target
        if (value < 0) value = 0
        this.setState({
            ...this.state,
            pages: value,
        })
    }

    submitForm = () => {
        this.props.handleSubmit(this.state) // adds person to App state
        this.setState(this.initialState) // clears Form state
    }

    render() {
        console.log(this.state)
        const { artist, date, pages, upload } = this.state
        const { leaderboard } = this.props

        const rows = leaderboard.map((row, index) => {
            return <option value={row[0]} key={index}>{row[0]}</option>
        })

        return (
            <div>
                <h2>Add new page</h2>
                <form>
                    <label>Artist</label>
                    <select name='artist' value={artist} onChange={this.handleChangeArtist}>
                        {rows}
                    </select>

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

                    <label>Upload</label>
                    <input type='file' name='upload' accept='image/*' />

                    <input type='button' value='Submit' onClick={this.submitForm} />
                </form>
            </div>
        )
    }
}

export default PageForm
