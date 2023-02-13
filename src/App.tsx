import { getFormattedWeatherData, WeatherSearchParams } from './services/weather'
import { Forecast } from './components/Forecast'
import { Inputs } from './components/Inputs'
import { Stats } from './components/Stats'
import { TimeAndLocation } from './components/TimeAndLocation.tsx'
import { useEffect, useState } from 'react'
import { FormattedWeatherData } from './services/types'
import { Units } from './components/Units'
import { CurrentTemperature } from './components/CurrentTemperature'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './styles.module.sass';

function App() {

  const [query, setQuery] = useState<WeatherSearchParams>({ q: 'Buenos Aires' });
  const [units, setUnits] = useState<WeatherSearchParams['units']>('metric');
  const [weather, setWeather] = useState<any | null>(null);

  const fetchWeather = async () => {
    const { q: city } = query;
    const message = city ? city : 'current location.';

    toast.info(`Fetching weather for ${message}`);

    await getFormattedWeatherData({ ...query, units }).then((formattedWeatherData: FormattedWeatherData) => {
      toast.success(`Successfully fetched weather for ${formattedWeatherData.name}, ${formattedWeatherData.country}`)
      setWeather(formattedWeatherData);
    })
  }

  useEffect(() => {
    fetchWeather();
  }, [query, units]);

  return (
    <div className={styles['main-container']}>
      {weather && (
        <>
          <div className={styles.topbar}>
            <TimeAndLocation weather={weather} />
            <Units units={units} setUnits={setUnits} />
          </div>
          <Inputs setQuery={setQuery} />
          <>
            <CurrentTemperature icon={weather.icon} temp={weather.temp} details={weather.details} />
            <Stats weather={weather} />
            <Forecast title="hourly forecast" items={weather.hourlyMap} />
            <Forecast title="daily forecast" items={weather.dailyMap} />
          </>
        </>
      )
      }
      <ToastContainer
        autoClose={1500}
        theme={'colored'}
        newestOnTop
      />
    </div>
  )
}

export default App
