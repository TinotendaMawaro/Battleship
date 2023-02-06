import React from 'react'
import { Header } from './components/Header'
import { Main } from './components/Main'
import { Footer } from './components/Footer'
import styles from './App.module.css'
import { useState } from 'react'
import { Battleship } from './modules/Battleship'
import { BattleshipContext, SetBattleshipContext } from './components/BattleshipContext'

Battleship.init()
function App() {
  const [battleship, setBattleship] = useState({model:Battleship})
  return (
    <div className={styles.container}>
      <Header/>
        <BattleshipContext.Provider value={battleship}>
          <SetBattleshipContext.Provider value={setBattleship}>
            <Main/>
          </SetBattleshipContext.Provider>
        </BattleshipContext.Provider>
      <Footer/>
    </div>
  )
}

export default App