interface Coord {
    lon: number;
    lat: number;
}

interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

interface Wind {
    speed: number;
    deg: number;
}

interface Clouds {
    all: number;
}

interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface WeatherData {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}


export interface OneCallWeatherData {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    hourly: HourlyData[];
    daily: DailyData[];
    extended_daily: ExtendedDailyData[];
}

export interface HourlyData {
    dt: number;
    temp: Temp;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: WeatherInfo[];
    pop: number;
}

interface WeatherInfo {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface DailyData {
    dt: number;
    temp: Temp;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Weather[];
    pop: number;
}

interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface WeatherDetails {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

interface ExtendedDailyData {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    temp: WeatherDetails;
    feels_like: WeatherDetails;
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Weather[];
    clouds: number;
    pop: number;
    uvi: number;
}

export interface Temp {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

export interface FormattedWeatherData {
    lat: number;
    lon: number;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    name: string;
    dt: number;
    country: string;
    sunrise: number;
    sunset: number;
    speed: number;
    details: string;
    icon: string;
    timezone?: string;
}