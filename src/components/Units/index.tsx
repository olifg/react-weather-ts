import { SetStateAction } from "react";
import { WeatherSearchParams } from "../../services/weather";

import styles from './styles.module.sass';


type UnitsProps = {
    units: WeatherSearchParams['units'];
    setUnits: React.Dispatch<SetStateAction<WeatherSearchParams['units']>>;
}

export const Units = ({ units, setUnits }: UnitsProps) => {

    const handleUnitsChange = (name: WeatherSearchParams['units']) => {
        if (units !== name) {
            setUnits(name);
        }
    };

    return (
        <div className={styles.container}>
            <span className={styles.button} onClick={() => { handleUnitsChange('metric') }}>°C</span>
            <p className={styles.separator}>|</p>
            <span className={styles.button} onClick={() => handleUnitsChange('imperial')}>°F</span>
        </div>
    )
}