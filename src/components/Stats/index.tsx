import React from 'react'
import { FormattedWeatherData } from '../../services/types';
import { formatToLocalTime } from '../../services/weather';
import { WeatherStat } from './IndividualStat';

import styles from './styles.module.sass'

type PropsType = {
    weather: FormattedWeatherData;
}

export const Stats = ({ weather: {
    temp_min,
    temp_max,
    sunrise,
    sunset,
    humidity,
    feels_like,
    timezone,
} }: PropsType) => {
    return (
        <div className={styles.main}>
            <div className={styles.statsContainer}>
                <WeatherStat label={'High'} content={`${temp_max.toFixed()}°`} />
                <WeatherStat label={'Feel'} content={`${feels_like.toFixed()}°`} />
                <WeatherStat label={'Sunrise'} content={formatToLocalTime(sunrise, timezone!, 'hh:mm a')} />
            </div>
            <div className={styles.statsContainer}>
                <WeatherStat label={'Low'} content={`${temp_min.toFixed()}°`} />
                <WeatherStat label={'Humidity'} content={`${humidity.toFixed()}%`} />
                <WeatherStat label={'Sunset'} content={formatToLocalTime(sunset, timezone!, 'hh:mm a')} />
            </div>
        </div>
    )
}
