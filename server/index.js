const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const app = express()
const artists = ['wang', 'wango', 'wangers'] // pseudo-database lmao

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

app.get('/api/getArtists', (req, res) => {
    res.json(artists)
    console.log('GET: artists')
})

app.post('/api/addArtist', (req, res) => {
    const artist = req.body.artist
    if (artist && !artists.includes(artist)) {
        artists.push(artist)
        res.send('POST: artist ' + artist)
    }
})

// TODO
app.post('/api/addPage', (req, res) => {
    res.send('TODO')
})

// handles other requests
app.get('*', (req,res) =>{
    res.json('Not a route!');
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port)
