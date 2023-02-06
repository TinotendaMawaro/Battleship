class Gameboard {
    constructor (self=this) {
        self.board = [...new Array(10)].map(el=>{
            return [...new Array(10).fill(null)]
        })
        self.ships = []
    }
    
    placeShip = (position, ship, self = this) =>{
        const { row, col, direction } = position
        const { length } = ship
        // placing ship on the board
        switch (direction) {
            case "west":
                if (col + length > 10) return false
                for (let i = 0; i < length; i++){
                    self.board[row][col+i] = ship
                }
                break
            case "north":
                if (row + length > 10) return false
                for (let i = 0; i < length; i++){
                    self.board[row+i][col] = ship
                }
                break
            case "east":
                if (col - length < -1) return false
                for (let i = 0; i < length; i++){
                    self.board[row][col-i] = ship
                }
                break
            case "south":
                if (row - length < -1) return false
                for (let i = 0; i < length; i++){
                    self.board[row-i][col] = ship
                }
                break
        }
        self.ships.push(ship)
        return true
    }

    receiveAttack = ({ row, col }, self = this) =>{
        switch (true) {
            case self.board[row][col] === null:
                self.board[row][col] = "miss"
                return true
            case self.board[row][col] === 'miss':
                return false
            case self.board[row][col] === 'hit':
                return false
            case self.board[row][col] !== null:
                self.board[row][col].hit()
                self.board[row][col] = "hit"
                return true
        }
    }

    report = (self = this) => {
        const sunkenShips = self.ships.filter(ship=>{
            return ship.isSunk
        })
        const operationalShips = self.ships.filter(ship=>{
            return !ship.isSunk
        })
        return {
            sunkenShips,
            operationalShips
        }
    }
}

export { Gameboard }