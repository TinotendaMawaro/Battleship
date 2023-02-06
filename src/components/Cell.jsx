import styles from './Cell.module.css'
import React from 'react'
import { useContext } from 'react'
import { BattleshipContext, SetBattleshipContext } from './BattleshipContext'
import { Battleship } from '../modules/Battleship'

const Cell = ({ content, datakey, props }) => {
    const setBattleship = useContext(SetBattleshipContext)
    const {row, col} = datakey
    const { board, generateMove, isAI, name, registerMove, shipYard } = props.player
    let activeClass
    let display
    switch (content) {
        case null:
            activeClass = styles.null
            break
        case 'miss':
            activeClass = styles.miss
            break
        case 'hit':
            activeClass = styles.hit
            break
        default:
            activeClass = isAI ? 'hidden' : `${styles.ship} ${content.isSunk ? 'sunk' : ''}`
            break
    }

    const handleClick = (e) => {
        e.stopPropagation()
        if (!isAI) return
        if (content === 'miss' || content === 'hit') return
        Battleship.registerMove({row:row,col:col})
        setBattleship({model:Battleship})
    }

    return (
        <div className={`${styles.container} ${activeClass}`} onClick={handleClick}>
            {display}
        </div>
    )
}

export { Cell }