export interface WeatherCondition {
  temp: number
  condition: string
}
export interface CityWithWeather {
  id: number
  name: string
  current: WeatherCondition & { humidity: number; windSpeed: number }
  forecast: (WeatherCondition & { day: string })[]
}
