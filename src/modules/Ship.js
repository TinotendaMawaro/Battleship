class Ship {
    constructor ({ length }, self = this) {
        self.length = length ?? 0
        self.hits = 0
        self.isSunk = false
    }

    hit = (self = this) => {
        self.hits++
        self.isSunk = self.length <= self.hits
        return true
    }
}

export { Ship }