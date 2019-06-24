class Drawing {
    /*
        image - path to associated image file
        pages - number of pages drawing takes up
        date - YYYY-MM-DD format
    */
    constructor(image, pages, date) {
        this.image = image
        this.pages = pages
        this.dates = date
    }

    serialize() {
        return {
            image: this.image,
            pages: this.pages,
            dates: this.dates
        }
    }
}

module.exports = Drawing
