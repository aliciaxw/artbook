import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            name: '',
        };

        this.state = this.initialState;
    }

    // updates input value on change
    handleChange = event => {
        const { value } = event.target;
        this.setState({
            name: value,
        })
    }

    submitForm = () => {
        this.props.handleSubmit(this.state); // adds person to App state
        this.setState(this.initialState); // clears Form state
    }

    render() {
        const { name } = this.state;
        return (
            <form>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.handleChange} />
                <input type='button' value='Submit' onClick={this.submitForm} />
            </form>
        )
    }
}

export default Form;
