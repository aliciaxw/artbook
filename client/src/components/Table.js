import React, { Component } from 'react'

// class component, expects data to be an array of arrays
class Table extends Component {
    render() {
        const { data } = this.props // contains this.props.data
        return (
            <table>
                <TableHeader />
                <TableBody data={data} />
            </table>
        )
    }
}

// simple components
const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Pages</th>
            </tr>
        </thead>
    )
}

/*
    Expecting a table with two columns
*/
const TableBody = props => {
    const rows = Object.keys(props.data).map((row, index) => {
        const col1 = props.data[row][0]
        const col2 = props.data[row][1]
        return (
            <tr key={index}>
                <td>{col1}</td>
                <td>{col2}</td>
            </tr>
        )
    })

    return <tbody>{rows}</tbody>
}

export default Table
