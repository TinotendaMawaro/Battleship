import { expect, describe, it, test } from 'vitest'
import { Ship } from './Ship'

describe('Ship', () => {
    const testShip = new Ship({ length:2 })
    it('stats of newly created ship', ()=>{
        expect({
            length:testShip.length,
            hits:testShip.hits,
            isSunk:testShip.isSunk
        }).toEqual({ length: 2, hits: 0, isSunk: false })
    })
    
    it('hit => stats of hitted ship', () => {
        testShip.hit()
        testShip.hit()
        expect(testShip.hits).toBe(2)
    })

    it('hitted ships sunk', () => {
        expect(testShip.isSunk).toBe(true)
    })
})
