export type TWeatherLocation = {
  "name": string,
  "region": string,
  "country": string,
  "lat": number,
  "lon": number,
  "tz_id": string,
  "localtime_epoch": number,
  "localtime": string
}

export type TWeatherCurrenCondition = {
  "text": string,
  "icon": string,
  "code":  number
}

export type TWeatherCurrent = {
  temp_c: number;
  temp_f: number;
  condition: TWeatherCurrenCondition;
  humidity: number;
  wind_kph: number;
  feelslike_c: number;
  feelslike_f: number;
}

export type TWeather = {
  location: TWeatherLocation;
  current: TWeatherCurrent
}

export type TForecastDay ={
  date: string;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    condition: TWeatherCurrenCondition;
    avgtemp_c: number;
  };
}

export type TForecast= {
  forecastday:TForecastDay[]
}

export type TWeatherForecast = TWeather & {
  forecast: TForecast
}