const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const User = require('./User.js')

const app = express()
// const artists = ['wang', 'wango', 'wangers'] // pseudo-database lmao
const user1 = new User('wang')
const user2 = new User('wango')
const user3 = new User('mango')
const users = [user1, user2, user3]

//app.use(express.static(path.join(__dirname, 'client/build'))) wrong
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))

/***** Routes *****/

app.get('/', (req, res) => {
    res.json('Hello World!')
})

/*
    Returns an array of serialized User objects.
*/
app.get('/api/getArtists', (req, res) => {
    const artists = []
    users.forEach(user => {
        artists.push(user.serialize())
    })
    res.json(artists)
    console.log('GET: artists')
})

/*
    Returns an array of artist names.
*/
app.get('/api/getNames', (req, res) => {
    const names = []
    users.forEach(user => {
        names.push(user.name)
    })
    res.json(names)
    console.log('GET: names')
})

app.post('/api/addArtist', (req, res) => {
    const artist = req.body.artist
    if (artist && !users.includes(artist)) {
        users.push(artist)
        res.send('POST: artist ' + artist)
    }
})

// TODO
app.post('/api/addPage', (req, res) => {
    res.send('TODO')
})

// handles other requests
app.get('*', (req,res) =>{
    res.json('Not a route!')
})

const port = process.env.PORT || 5000
app.listen(port)

console.log('App is listening on port ' + port)
