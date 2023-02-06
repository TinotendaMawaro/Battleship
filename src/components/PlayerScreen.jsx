import styles from './PlayerScreen.module.css'
import React from "react"
import { Cell } from './Cell'
import { ShipYard } from './ShipYard'

const PlayerScreen = (props) => {
    const { board, generateMove, isAI, name, registerMove, shipYard, hasWon } = props.player

    return (
        <div className={styles.container}>
            <div className={styles.name}>{name}</div>
            <div className={styles.gridContainer}>
                {board.board.map((row,rowIndex)=>{
                    return row.map((col,colIndex)=>{
                        return <Cell key={colIndex} content={col} props={props} datakey={{row:rowIndex, col:colIndex}}/>
                    })
                })}
            </div>
            <ShipYard props={board.ships}/>
        </div>
    )
}

export { PlayerScreen }