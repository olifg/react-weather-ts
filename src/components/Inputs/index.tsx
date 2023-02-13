import React, { Dispatch, SetStateAction, useState } from 'react'
import { SearchIcon } from '../../icons/SearchIcon'
import { LocationIcon } from '../../icons/LocationIcon'
import { WeatherSearchParams } from '../../services/weather';
import { toast } from 'react-toastify';

import styles from './styles.module.sass';

type InputProps = {
    setQuery: Dispatch<SetStateAction<WeatherSearchParams>>;
}

export function Inputs({ setQuery }: InputProps) {
    const [city, setCity] = useState('');

    const handleSearchClick = () => {
        if (city) {
            setQuery({ q: city })
        }
    }

    const reportPermissionState = (state: PermissionState) => {
        console.log('Permission: ' + state);
    }

    const handleError = (error: GeolocationPositionError) => { console.log(error.message) }

    const handleSuccess = (position: GeolocationPosition) => {
        toast.info(`Fetching user's location`)
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setQuery({
            lat: lat,
            lon: lon,
        })
        toast.info(`Location fetched!`);
    }

    const handleLocationClick = () => {
        let geoSettings = {
            enableHighAccuracy: false,
            maximumAge: 30000,
            timeout: 20000
        };

        navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
            if (result.state == 'granted') {
                reportPermissionState(result.state);
                navigator.geolocation.getCurrentPosition(handleSuccess, handleError, geoSettings);
            } else if (result.state == 'prompt') {
                if (navigator.geolocation) {
                    toast.info(`Fetching user's location`)
                    navigator.geolocation.getCurrentPosition((position) => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        setQuery({
                            lat: lat,
                            lon: lon,
                        })
                        toast.info(`Location fetched!`)
                    })
                }

            } else if (result.state == 'denied') {
                reportPermissionState(result.state);
            }
            result.onchange = function () {
                reportPermissionState(result.state);
            }
        }).catch((e) => {
            console.log(e)
        });
    }

    const handleQueryChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const value = ev.currentTarget.value;
        if (value.length > 30) toast.error('City name cannot exceed 30 letters.')
        setCity(ev.currentTarget.value)
    };


    return (
        <div className={styles.container}>
            <div className={styles['inputs-container']}>
                <input maxLength={30} type="text" placeholder='Search for city..' className={styles['text-input']} onChange={handleQueryChange} />
                <SearchIcon extraClasses={styles.button} width={25} height={25} onClick={handleSearchClick} />
                <LocationIcon extraClasses={styles.button} width={25} height={25} onClick={handleLocationClick} />
            </div>
        </div>
    )
}


