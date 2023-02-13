import React from 'react'
import { iconUrlFromCode } from '../../services/weather';

import styles from './styles.module.sass';

type ForecastItemType = {
    icon: string;
    temp: number;
    title: string;
}

interface ForecastProps {
    title: string;
    items: ForecastItemType[];
}

export const Forecast = ({ title, items }: ForecastProps) => {
    const mappedItems = React.useMemo(() => (items: ForecastItemType[]) => {
        return items.map((item, index) => {
            return (
                <div key={index} className={styles['items-container']}>
                    <span className={styles['items-title']}>
                        {item.title}
                    </span>
                    <img src={iconUrlFromCode(item.icon)} alt="Time image" className={styles['items-icon']} />
                    <span className={styles['items-value']}>{`${item.temp.toFixed()}°`}</span>
                </div>)
        })
    }, [items])

    return (
        <div className={styles['main']}>
            <div className={styles['forecast-container']}>
                <span className={styles['forecast-title']}>{title}</span>
            </div>
            <hr className={styles['forecast-separator']} />
            <div className={styles['forecast-items']}>
                {mappedItems(items)}
            </div>
        </div>
    )
}




