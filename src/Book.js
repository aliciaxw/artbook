import React, { Component } from 'react'
import Day from './Day'
import Nav from './Nav'
import Table from './Table'

class Book extends Component {
    state = {}

    render() {
        const { groups } = { groups: {'wang': ['3'], 'wangers':['1'], 'mango': ['2.75']} };
        return (
            <div>
                <Nav />
                <div className='page'>
                    <div className='sidebar'>
                        <table>
                            <tr>
                            <td><button>Add artist</button></td>
                            <td><button>Add page</button></td>
                            </tr>
                        </table>
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
