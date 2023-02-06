import { describe, it, expect, beforeEach } from "vitest";

describe('Battleship', ()=> {
    let Battleship, Player
    beforeEach(async()=>{
        const mod = await import('./Battleship')
        const mod2 = await import('./Player')
        Battleship = mod.Battleship
        Player = mod2.Player
    })
    it('init =>', ()=> {
        Battleship.init()
        expect(Player.list.length).toBe(2)
        expect(Battleship.player1.board.ships.length).toEqual(10)
        expect(Battleship.player2.board.ships.length).toEqual(10)
    })
    it('registerMove =>', ()=>{
        Battleship.init()
        Battleship.registerMove({row:9, col:9})
        Battleship.registerMove({row:9, col:8})
        // console.log(Battleship.player1.board.board)
        // console.log(Battleship.player2.board.board)
    })
    it('checkWinner => ', ()=>{
        Battleship.init()
        Battleship.registerMove({row:9, col:9})
        Battleship.player2.board.ships.forEach(el=>el.isSunk = true)
        Battleship.player1.checkWinner()
        expect(Battleship.player1.hasWon).toBe(true)
    })
})