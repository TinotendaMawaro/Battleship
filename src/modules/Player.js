import { Gameboard } from "./Gameboard"

class Player {
    static list = []
    static turnCount = 0
    static turn = Player.list[0]

    static nextTurn = (self = Player) => {
        self.turnCount++
        self.turn = self.list[self.turnCount % 2]
        return self.turn
    }

    constructor ({ name, isAI }, self = this){
        self.name = name
        self.board = new Gameboard
        self.isAI = isAI ?? false
        self.shipYard = []
        self.hasWon = false
        Player.list.push(self)
        Player.turn = Player.list[0]
    }
    
    registerMove = (coordinate, self = this)=>{
        const enemyBoard = Player.list.filter(el=>el!==self)[0].board
        if (self.isAI) {
            enemyBoard.receiveAttack(self.generateMove())
            Player.nextTurn()
            return true
        } else {
            if (enemyBoard.receiveAttack(coordinate)){
                Player.nextTurn()
                return true
            } else {
                return false
            }
        }
    }

    generateMove = (enemyBoard = Player.list.filter(el=>el!==this)[0].board.board) => {
        let availableSpot = []
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++){
                if (enemyBoard[i][j] !== 'miss' && enemyBoard[i][j] !== 'hit') {
                    availableSpot.push({row:i, col:j})
                }
            }
        }
        const availableSpotCount = availableSpot.length - 1
        const randomIndex = Math.floor(Math.random() * availableSpotCount)
        return availableSpot[randomIndex]
    }

    checkWinner = (enemyBoard = Player.list.filter(el=>el!==this)[0].board) => {
        // console.log(enemyBoard.report())
        this.hasWon = (enemyBoard.report().operationalShips.length === 0)
        return true
    }
}

export { Player }