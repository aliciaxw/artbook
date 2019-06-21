import React, { Component } from 'react'

// class component
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

const TableBody = props => {
    const rows = Object.keys(props.data).map((row, index) => {
        const members = props.data[row].join(', ')
        return (
            <tr key={index}>
                <td>{row}</td>
                <td>{members}</td>
            </tr>
        )
    })

    return <tbody>{rows}</tbody>
}

export default Table
