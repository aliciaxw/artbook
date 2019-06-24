const Drawing = require('./Drawing.js')

class User {
    /*
        name - string
        drawings - array of Drawing objects
    */
    constructor(name) {
        this.name = name
        this.drawings = []
    }

    addDrawing(image, pages, date) {
        this.drawings.push(new Drawing(image, pages, date))
    }

    serialize() {
        const drawings = []
        this.drawings.forEach(drawing => {
            drawings.push(drawing.serialize())
        })
        return {
            name: this.name,
            pages: this.pages,
            drawings: drawings
        }
    }
}

module.exports = User
