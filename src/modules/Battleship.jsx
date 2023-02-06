import React from "react"
import { Player } from "./Player"
import { Ship } from "./Ship"

class Battleship {
    static player1 = new Player({ name: 'Player 1'})
    static player2 = new Player({ name:'Computer', isAI:true})

    static get turn() {
        return Player.turn
    }

    static set turn(arg) {
        Player.turn = arg
    }

    static init = (self = this) => {
        self.#populateStartingShips()
        self.#shippingToOpenSea()
    }

    static registerMove = (position, self=this)=>{
        const player = self.turn
        player.registerMove(position)
        player.checkWinner()
        const AI = self.player2
        AI.registerMove()
        AI.checkWinner()
        return true
    }

    static #populateStartingShips = (players = Player.list, ship = Ship) => {
        for (let i = 0; i < players.length; i++) {
            players[i].shipYard.push(new ship({ length: 1 }))
            players[i].shipYard.push(new ship({ length: 1 }))
            players[i].shipYard.push(new ship({ length: 1 }))
            players[i].shipYard.push(new ship({ length: 1 }))
            players[i].shipYard.push(new ship({ length: 2 }))
            players[i].shipYard.push(new ship({ length: 2 }))
            players[i].shipYard.push(new ship({ length: 2 }))
            players[i].shipYard.push(new ship({ length: 3 }))
            players[i].shipYard.push(new ship({ length: 3 }))
            players[i].shipYard.push(new ship({ length: 4 }))
        }
    }

    static #shippingToOpenSea = (self = this, players = Player.list) => {
        for (let i = 0; i < players.length; i++) {
            const player = players[i]
            while (player.shipYard.length !== 0){
                let before = player.board.ships.length
                player.board.placeShip(self.#randomizePlacement(), player.shipYard[0])
                let after = player.board.ships.length
                if (before !== after) {
                    player.shipYard.shift()
                }
            }
        }
        return true
    }

    static #randomizePlacement = () => {
        const random = (max) => {
            return Math.floor(Math.random() * max)
        }
        const directionOptions = ["north","east","south","west"]
        return {
            row:random(10),
            col:random(10),
            direction:directionOptions[random(4)]
        }
    }
}

export { Battleship }