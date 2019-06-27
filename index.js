const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const { Pool } = require('pg')

const app = express()

app.use(express.static(path.join(__dirname, 'client/build')))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


/***** Database *****/

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
})


pool.connect(async err => {
    if (err) {
        console.error(err)
    } else {
        console.log('connected to ' + process.env.DATABASE_URL)

        // initialize tables if not exist
        const usersQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                artist TEXT NOT NULL UNIQUE
            );`

        const drawingsQuery = `
            CREATE TABLE IF NOT EXISTS drawings (
                id SERIAL PRIMARY KEY,
                image TEXT NOT NULL,
                pages REAL NOT NULL,
                date TEXT NOT NULL,
                artist INT NOT NULL,
                FOREIGN KEY (artist) REFERENCES users(id) ON DELETE CASCADE
            );`

        await pool.query(usersQuery)
        console.log('users table initialized')
        await pool.query(drawingsQuery)
        console.log('drawings table initialized')
    }
})


/***** Routes *****/

/*
    Returns an array of Users.
*/
app.get('/api/getArtists', async (req, res) => {
    const out = await pool.query('SELECT * FROM users;')
    res.json(out.rows)
})


/*
    Returns an array of artist names.
*/
app.get('/api/getNames', async (req, res) => {
    const arr = []
    const out = await pool.query('SELECT artist FROM users;')
    for (const obj of out.rows) {
        arr.push(obj.artist)
    }
    res.json(arr)
})


/*
    Initializes a new artist.

    Body:
        artist - (str) The artist name
*/
app.post('/api/addArtist', (req, res) => {
    const artist = req.body.artist

    if (!artist) {
        res.status(400).send('Name cannot be empty')
    }

    // will end up skipping id numbers if name exists
    pool.query('INSERT INTO users (artist) VALUES($1) RETURNING *', [artist])
    .then(out => res.status(201).json(out.rows[0]))
    .catch(err => res.send('Artist name already exists'))
})


/*
    Adds a drawing to the specified user.

    Body:
        image - (str)
        pages - (number)
        date - (str YYYY-MM-DD)
*/
app.post('/api/addDrawing/:name', async (req, res) => {
    name = req.params.name
    image = req.body.image
    pages = Number(req.body.pages)
    date = req.body.date

    if (!name || !image || !pages || !date) {
        res.status(404).send('Missing field in body')
    } else {
        const out = await pool.query(`SELECT * FROM users WHERE artist = $1;`, [name])

        if (out.rows.length === 0) {
            res.send('Artist not found when adding drawing')
        } else {
            const artistID = out.rows[0].id
            const drawing = await pool.query(`
                INSERT INTO drawings (image, pages, date, artist)
                VALUES($1, $2, $3, $4)
                RETURNING *;`, [image, pages, date, artistID])

            res.status(201).json(drawing.rows[0])
        }
    }
})


/*
    Returns an array of all drawings.
    Artist field represents the artist's name, not their user id.
*/
app.get('/api/getDrawings', async (req, res) => {
    const out = await pool.query(`
        SELECT drawings.image, drawings.pages, drawings.date, users.artist
        FROM drawings
        LEFT JOIN users ON users.id = drawings.artist;`)
    res.json(out.rows)
})


/*
    Returns an array of drawings with artist = specified name.
*/
app.get('/api/getDrawingsByArtist/:name', async (req, res) => {
    name = req.params.name
    const out = await pool.query(`
        SELECT drawings.image, drawings.pages, drawings.date, users.artist
        FROM drawings
        LEFT JOIN users ON users.id = drawings.artist
        WHERE users.artist = $1;`, [name])
    res.json(out.rows)
})


/*
    Returns a mapping of a date to an array of drawings.
*/
app.get('/api/getDrawingsByDate', async (req, res) => {
    const out = await pool.query(`
        SELECT drawings.image, drawings.pages, drawings.date, users.artist
        FROM drawings
        LEFT JOIN users ON users.id = drawings.artist;`)

    const obj = {}
    for (const drawing of out.rows) {
        const date = drawing.date
        if (obj[date]) obj[date].push(drawing)
        else obj[date] = [drawing]
    }

    res.json(obj)
})


/*
    Returns the total number of pages an artist has.
*/
app.get('/api/getPages/:name', async (req, res) => {
    name = req.params.name

    const out = await pool.query(`
        SELECT drawings.pages
        FROM drawings
        LEFT JOIN users ON users.id = drawings.artist
        WHERE users.artist = $1;`, [name])

    let total = 0
    for (const drawing of out.rows) {
        total += drawing.pages
    }

    res.json(total)
})


/*
    Returns an array of arrays containing the names and total number of pages.
*/
app.get('/api/getLeaderboard', async (req, res) => {
    // get names
    const names = []
    const cur1 = await pool.query('SELECT artist FROM users;')
    for (const obj of cur1.rows) {
        names.push(obj.artist)
    }

    // populate leaderboard
    const leaderboard = []
    for (const name of names) {
        const cur2 = await pool.query(`
            SELECT drawings.pages
            FROM drawings
            LEFT JOIN users ON users.id = drawings.artist
            WHERE users.artist = $1;`, [name])

        let total = 0
        for (const obj of cur2.rows) {
            total += obj.pages
        }

        leaderboard.push([name, total])
    }

    res.json(leaderboard)
})

// handles other requests
app.get('*', (req, res) => {
    res.status(404).send('Not a valid route!')
})

const port = process.env.PORT || 5000
app.listen(port)

console.log('App is listening on port ' + port)
