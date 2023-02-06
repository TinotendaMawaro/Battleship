import styles from "./Main.module.css"
import React, { useContext, useEffect, useState, useSyncExternalStore } from 'react'
import { PlayerScreen } from "./PlayerScreen"
import { BattleshipContext } from "./BattleshipContext"

const Main = () => {
  const { player1, player2 } = useContext(BattleshipContext).model
  if (player1.hasWon === true) {
    return (
      <div className={styles.container}>
        {`${player1.name} HAS WON THE GAME`}
      </div>
    )
  } else if (player2.hasWon === true) {
    return (
      <div className={styles.container}>
        {`${player2.name} HAS WON THE GAME`}
      </div>
    )
  } else {
    return (
      <div className={styles.container}>
        <PlayerScreen player={player1}/>
        <PlayerScreen player={player2}/>
      </div>
    )
  }
}

export { Main }