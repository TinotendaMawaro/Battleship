import { beforeEach, describe, expect, it, vi } from "vitest";

describe('Gameboard', async()=>{
  let Gameboard
  let Ship
  beforeEach(async()=>{
    vi.resetModules()
    const mod = await import("./Gameboard")
    const mod2 = await import("./Ship");
    Gameboard = mod.Gameboard
    Ship = mod2.Ship
  })

  it('board => initialized properly', ()=>{
    const newGameboard = new Gameboard
    expect(newGameboard.board).toEqual([...new Array(10)].map(el=> [...new Array(10).fill(null)]))
  })

  it('placeShip => Ship is placed correctly on the board', ()=>{
    const newGameboard = new Gameboard
    const newShip = new Ship({ length:2 })
    newGameboard.placeShip({ row:0, col:1, direction:"east" }, newShip)
    expect(JSON.stringify(newGameboard.board)).toEqual(JSON.stringify([
        [
            newShip, newShip, null,
            null, null, null,
            null, null, null,
            null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ]
    ]))
  })

  it('placeShip => Ship is not placed when out of the board', ()=>{
    const newGameboard = new Gameboard
    newGameboard.placeShip({ row:0, col:9, direction:"west" }, new Ship({length:2}))
    expect(JSON.stringify(newGameboard.board)).toEqual(JSON.stringify([
        [
            null, null, null,
            null, null, null,
            null, null, null,
            null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ]
    ]))
  })
  it("receiveAttack => missed", () => {
    const newGameboard = new Gameboard
    newGameboard.receiveAttack({ row:0, col:0 })
    expect(JSON.stringify(newGameboard.board)).toEqual(JSON.stringify([
        [
            "miss", null, null,
            null, null, null,
            null, null, null,
            null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ]
    ]))
  })
  it("receiveAttack => hit", () => {
    const newGameboard = new Gameboard
    const newShip = new Ship({ length:1 })
    newGameboard.placeShip({ row:0, col:0, direction:'west' }, newShip)
    newGameboard.receiveAttack({ row:0, col:0 })
    expect(JSON.stringify(newGameboard.ships[0])).toEqual(JSON.stringify(newShip))
    expect(JSON.stringify(newGameboard.board)).toEqual(JSON.stringify([
        [
            "hit", null, null,
            null, null, null,
            null, null, null,
            null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ],
        [
          null, null, null,
          null, null, null,
          null, null, null,
          null
        ]
    ]))
  })

  it("report", ()=>{
    const newGameboard = new Gameboard
    newGameboard.placeShip({ row:0, col:0, direction:"west" }, new Ship({length:1}))
    newGameboard.placeShip({ row:0, col:2, direction:"west" }, new Ship({length:2}))
    newGameboard.ships[0].hit()
    const newShip = new Ship({ length: 2})
    const newShip2 = new Ship({ length: 1})
    newShip2.hit()
    expect(JSON.stringify(newGameboard.report())).toEqual(JSON.stringify({ sunkenShips:[newShip2], operationalShips:[newShip]}))
  })
})