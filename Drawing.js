class Drawing {
    /*
        artist - name of artist
        image - path to associated image file
        pages - number of pages drawing takes up
        date - YYYY-MM-DD format
    */
    constructor(artist, image, pages, date) {
        this.artist = artist
        this.image = image
        this.pages = pages
        this.date = date
    }

    serialize() {
        return {
            artist: this.artist,
            image: this.image,
            pages: this.pages,
            date: this.date
        }
    }
}

module.exports = Drawing
