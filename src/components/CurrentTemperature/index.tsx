import { FormattedWeatherData } from "../../services/types";
import { iconUrlFromCode } from "../../services/weather";

import styles from './styles.module.sass';

type CurrentWeatherPropsType = {
    icon: FormattedWeatherData['icon'];
    temp: FormattedWeatherData['temp'];
    details: FormattedWeatherData['details'];
}

export const CurrentTemperature = ({ icon, temp, details }: CurrentWeatherPropsType) => {
    return (
        <div className={styles.container}>
            <img src={iconUrlFromCode(icon)} alt="" className={styles.icon} />
            <div className={styles.temperature}>
                <span className={styles['current-temperature']}>{`${temp.toFixed()}°`}</span>
                <div className={styles['current-temperature-description']}>
                    <span>{details}</span>
                </div>
            </div>
        </div>)
}