const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
// const User = require('./User.js')
const Drawing = require('./Drawing')

const app = express()

//app.use(express.static(path.join(__dirname, 'client/build'))) wrong
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}))

/***** Models *****/

const users = { // mapping of user name to array of drawings
    wang: [],
    wango: [],
    mango: []
}

/*
    Returns an array of serialized drawings for a user.
*/
function serializeDrawings(name) {
    return users[name].map(drawing => drawing.serialize())
}

/*
    Returns users with their drawings serialized.
*/
function serializeUsers() {
    res = {}
    Object.keys(users).forEach(name => {
        res[name] = serializeDrawings(name)
    })
    return res
}

/***** Routes *****/

app.get('/', (req, res) => {
    res.json('Hello World!')
})

/*
    Returns the users object.
*/
app.get('/api/getArtists', (req, res) => {
    res.json(serializeUsers(users))
})

/* Helper that returns an array of all artist names */
function getNames() {
    const names = []
    Object.keys(users).forEach(name => {
        names.push(name)
    })
    return names
}
/*
    Returns an array of artist names.
*/
app.get('/api/getNames', (req, res) => {
    names = getNames()
    res.json(names)
})

/*
    Initializes a new artist.

    Body:
        artist - (str) The artist name
*/
app.post('/api/addArtist', (req, res) => {
    const artist = req.body.artist

    if (!artist) {
        res.status(400).send('ERR: Name cannot be empty')
    } else if (!Object.keys(users).includes(artist)) {
        users[artist] = []
        res.send('POST: artist ' + artist)
    } else {
        res.send('User already exists')
    }
})

/*
    Adds a drawing to the specified user.

    Body:
        image - (str)
        pages - (number)
        date - (str YYYY-MM-DD)
*/
app.post('/api/addDrawing/:name', (req, res) => {
    name = req.params.name
    image = req.body.image
    pages = Number(req.body.pages)
    date = req.body.date

    if (!name || !image || !pages || !date) {
        res.status(404).send('ERR: Missing field in body')
    }

    if (!users[name]) {
        res.status(404).send('ERR: User not found')
    } else {
        users[name].push(new Drawing(name, image, pages, date))
        res.send('POST: drawing ' + image)
    }
})

/* Helper */
function getAllDrawings() {
    let out = []
    Object.keys(users).forEach(name => {
        out = out.concat(users[name])
    })
    return out
}
/*
    Returns an array of all drawings.
*/
app.get('/api/getDrawings', (req, res) => {
    res.json(getAllDrawings().map(x => x.serialize()))
})

/*
    Returns the user with the specified name.
*/
app.get('/api/getDrawingsByArtist/:name', (req, res) => {
    name = req.params.name
    if (!users[name]) {
        res.status(404).send('ERR: User not found')
    } else {
        res.json(serializeDrawings(name))
    }
})

/*
    Returns a mapping of date to an array of drawings.
*/
app.get('/api/getDrawingsByDate', (req, res) => {
    const out = {}
    Object.keys(users).forEach(name => {
        users[name].forEach(drawing => {
            const date = drawing.date
            if (out[date]) {  // date exists in obj
                out[date].push(drawing.serialize())
            } else {
                out[date] = [drawing.serialize()]
            }
        })
    })
    res.json(out)
})

/* Helper that returns the number of pages of a user. */
function getPages(name) {
    let total = 0
    users[name].forEach(drawing => {
        total += drawing.pages
    })
    return total
}
/*
    Returns the total number of pages an artist has.
*/
app.get('/api/getPages/:userID', (req, res) => {
    id = req.params.userID
    if (!users[id]) {
        res.status(404).send('ERR: User not found')
    } else {
        const total = getPages(id)
        res.json(total)
    }
})

/*
    Returns an array of arrays containing the names
    and total number of pages.
*/
app.get('/api/getLeaderboard', (req, res) => {
    let out = []
    Object.keys(users).forEach(name => {
        out.push([name, getPages(name)])
    })
    res.json(out)
})

// handles other requests
app.get('*', (req, res) => {
    res.json('Not a route!')
})

const port = process.env.PORT || 5000
app.listen(port)

console.log('App is listening on port ' + port)
