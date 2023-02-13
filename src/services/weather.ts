import { FormattedWeatherData, OneCallWeatherData } from "./types";
import { DateTime } from 'luxon'

export const OPEN_WEATHER_API_KEY = `ADD_YOUR_API_KEY`;
export const OW_BASE_URL = `https://api.openweathermap.org/data/2.5/`

type QueryType =
    'weather' | 'onecall'

type UnitType = 'imperial' | 'metric';

export interface WeatherSearchParams {
    q?: string;
    lat?: GeolocationCoordinates["latitude"];
    lon?: GeolocationCoordinates["longitude"];
    units?: UnitType;
}

const getWeatherData = (queryType: QueryType, searchParams: any): Promise<any> => {

    const url = new URL(OW_BASE_URL + "/" + queryType);
    url.search = new URLSearchParams({ ...searchParams, appId: OPEN_WEATHER_API_KEY }).toString()

    return fetch(url).then((res) => res.json()).then((data: any) => data);
}

const formatCurrentWeather = (data: any): FormattedWeatherData => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt, //UTC timestamp
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed }
    } = data;

    const { main: details, icon } = weather[0];

    return { lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, speed, details, icon }
}

const formatForcastWeather = (data: OneCallWeatherData) => {
    const {
        timezone,
        daily,
        hourly
    } = data;

    const dailyMap = daily.slice(1, 6).map(dailyForecast => {
        return {
            title: formatToLocalTime(dailyForecast.dt, timezone, 'ccc'),
            temp: dailyForecast.temp.day,
            icon: dailyForecast.weather[0].icon
        };
    });

    const hourlyMap = hourly.slice(1, 6).map(hourlyForecast => {
        return {
            title: formatToLocalTime(hourlyForecast.dt, timezone, 'hh:mm a'),
            temp: hourlyForecast.temp,
            icon: hourlyForecast.weather[0].icon
        };
    });

    return { timezone, dailyMap, hourlyMap }
}

export const getFormattedWeatherData = async (searchParams: WeatherSearchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData('onecall', {
        lat, lon, exclude: 'current,minutely,alerts', units: searchParams.units
    }).then(formatForcastWeather)

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
};


export const formatToLocalTime = (secs: number, zone: string, format: string = "cccc, dd LLL yyyy' | 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

export const iconUrlFromCode = (code: string) => `https://openweathermap.org/img/wn/${code}.png`