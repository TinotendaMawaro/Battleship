import React from "react";
import styles from './ShipYard.module.css'

const ShipYard = ({props}) => {
    const ships = props
    return (
        <div className={styles.container}>
            <div className={styles.title}>{props.name}</div>

        </div>
    )
}

export { ShipYard }