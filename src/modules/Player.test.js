import { beforeEach, describe, expect, it, vi } from "vitest";

describe("Player", ()=>{
    let Player
    beforeEach(async()=>{
        vi.resetModules()
        const mod = await import("./Player")
        Player = mod.Player
    })

    it("list => correct amount of player in the list", ()=> {
        const player1 = new Player({name:"viky"})
        expect(Player.list.length).toEqual(1)
        new Player({name:"computer"})
        expect(Player.list.length).toEqual(2)
    })
    
    it("generateMove => generate legal move", () => {
        const player1 = new Player({ name: "test"})
        const computer = new Player({ name: "computer", isAI:true })
        player1.board.board = [...new Array(10)].map(el=>{
            return [...new Array(10).fill("hit")]
        })

        player1.board.board[0][0] = null
        const result = computer.generateMove()
        expect(result).toEqual({col:0, row:0})
    })

    it('nextTurn => return next turn', ()=>{
        const player1 = new Player({ name: "test"})
        const computer = new Player({ name: "computer", isAI:true })
        expect(Player.nextTurn()).toEqual(computer)
        expect(Player.nextTurn()).toEqual(player1)
    })

    it('registerMove => registering activePlayer move unto enemy board and call next Turn', ()=>{
        const player1 = new Player({ name: "test"})
        const computer = new Player({ name: "computer", isAI:true })
        expect(player1.registerMove({row:0,col:0})).toEqual(true)
        expect(Player.turnCount).toEqual(1)
    })

    it('checkWinner =>', ()=>{
        const player1 = new Player({ name: "test"})
        const computer = new Player({ name: "computer", isAI:true })
    })
})