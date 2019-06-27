const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const { Pool } = require('pg')
const Drawing = require('./Drawing')

const app = express()

app.use(express.static(path.join(__dirname, 'client/build')))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}))

/***** Database *****/

const connectionString = 'postgres://210499@localhost:5432/210499'

const pool = new Pool({
    connectionString: connectionString //process.env.DATABASE_URL
    // ssl: true
})

pool.connect((err) => {
    if (err) {
        console.error(err)
    } else {
        console.log('connected to ' + connectionString /*process.env.DATABASE_URL*/)

        // initialize tables if not exist
        const usersQuery = `CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, artist TEXT NOT NULL UNIQUE);`
        const drawingsQuery = `CREATE TABLE IF NOT EXISTS drawings (
            id SERIAL PRIMARY KEY,
            image TEXT NOT NULL,
            pages REAL NOT NULL,
            date TEXT NOT NULL,
            artist INT NOT NULL,
            FOREIGN KEY (artist) REFERENCES users(id) ON DELETE CASCADE
        );`

        // TODO reformat this...
        pool.query(usersQuery)
        .then(res => {
            console.log('users table created')
            pool.query(drawingsQuery)
            .then(res => console.log('drawings table created')).catch(err=>console.error(err))
        })
        .catch(err => console.error(err))
    }
})


/*
    Returns an array of Users.
*/
app.get('/api/getArtists', (req, res) => {
    pool.query('SELECT * FROM users;', (err, out) => {
        if (err) console.error(err)
        res.json(out.rows)
    })
})


/*
    Returns an array of artist names.
*/
app.get('/api/getNames', (req, res) => {
    pool.query('SELECT artist FROM users;', (err, out) => {
        if (err) console.error(err)

        const arr = []
        out.rows.forEach(obj => {
            arr.push(obj.artist)
        })
        res.json(arr)
    })
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
    }

    // will end up skipping id numbers if name exists
    pool.query('INSERT INTO users (artist) VALUES($1) RETURNING *', [artist], (err, out) => {
        if (err) {
            res.send('Name already exists')
        } else {
            res.status(201).json(out.rows[0])
        }
    })
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
    } else {

    pool.query(`SELECT * FROM users WHERE artist = $1;`, [name])
    .then(out => {
        if (out.rows.length === 0) {
            res.send('artist not found when adding drawing')
        } else {
            const artistID = out.rows[0].id
            pool.query(`
                INSERT INTO drawings (image, pages, date, artist)
                VALUES($1, $2, $3, $4)
                RETURNING *;
            `, [image, pages, date, artistID])
            .then(obj => res.status(201).json(obj.rows[0]))
            .catch(err => res.status(500).send('error inserting drawing'))
        }
    })
    .catch(err => res.status(500).send('error querying artist'))
    }
})


/*
    Returns an array of all drawings.
    Artist field represents the artist's name, not their user id.
*/
app.get('/api/getDrawings', (req, res) => {
    pool.query(`
        SELECT drawings.image, drawings.pages, drawings.date, users.artist
        FROM drawings
        LEFT JOIN users ON users.id = drawings.artist;`)
    .then(out => res.json(out.rows))
    .catch(err => res.status(500).send('error querying drawings'))
})


/*
    Returns an array of drawings with artist = specified name.
*/
app.get('/api/getDrawingsByArtist/:name', (req, res) => {
    name = req.params.name
    pool.query(`
        SELECT drawings.image, drawings.pages, drawings.date, users.artist
        FROM drawings
        LEFT JOIN users ON users.id = drawings.artist
        WHERE users.artist = $1;`, [name])
    .then(out => res.json(out.rows))
    .catch(err => res.status(500).send('error querying drawings by artist name'))
})


/*
    Returns a mapping of a date to an array of drawings.
*/
app.get('/api/getDrawingsByDate', (req, res) => {
    const obj = {}
    pool.query(`
        SELECT drawings.image, drawings.pages, drawings.date, users.artist
        FROM drawings
        LEFT JOIN users ON users.id = drawings.artist;`)
    .then(out => {
        out.rows.forEach(drawing => {
            const date = drawing.date
            if (obj[date]) obj[date].push(drawing)
            else obj[date] = [drawing]
        })
        res.json(obj)
    })
    .catch(err => res.status(500).send('error querying drawings by date'))
})


/*
    Returns the total number of pages an artist has.
*/
app.get('/api/getPages/:name', (req, res) => {
    name = req.params.name
    pool.query(`
        SELECT drawings.pages
        FROM drawings
        LEFT JOIN users ON users.id = drawings.artist
        WHERE users.artist = $1;`, [name])
    .then(out => {
        let total = 0
        out.rows.forEach(obj => total += obj.pages)
        res.json(total)
    })
    .catch(err => res.status(500).send('error getting total number of pages for ' + name))
})


/*
    Returns an array of arrays containing the names and total number of pages.
*/
app.get('/api/getLeaderboard', async (req, res) => {
    // get names
    const leaderboard = []
    const names = []

    const cur1 = await pool.query('SELECT artist FROM users;')
    cur1.rows.forEach(obj => {
        names.push(obj.artist)
    })

    // makes async functions work! avoid forEach :-)
    for (const name of names) {
        const cur2 = await pool.query(`
            SELECT drawings.pages
            FROM drawings
            LEFT JOIN users ON users.id = drawings.artist
            WHERE users.artist = $1;`, [name])

        let total = 0
        cur2.rows.forEach(obj => total += obj.pages)
        leaderboard.push([name, total])
    }
    res.json(leaderboard)
})

// handles other requests
app.get('*', (req, res) => {
    res.json('Not a route!')
})

const port = process.env.PORT || 5000
app.listen(port)

console.log('App is listening on port ' + port)
