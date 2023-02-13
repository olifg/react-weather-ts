import React from 'react'
import { formatToLocalTime } from '../../services/weather';

import styles from './styles.module.sass'

type PropsType = {
    weather: { dt: number, timezone: string, name: string, country: string };
}

export const TimeAndLocation = ({ weather: { dt, timezone, name, country } }: PropsType) => {

    return (
        <div className={styles.container}>
            <span className={styles.location}>
                {`${name}, ${country}`}
            </span>
            <span className={styles.date}>{formatToLocalTime(dt, timezone)}</span>
        </div>
    )
}
