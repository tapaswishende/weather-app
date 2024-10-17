import { City } from "@/app/_components/weather-dashboard";

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

export const cityWithWeathers: CityWithWeather[] = [
  {
    id: 1,
    name: "New York",
    current: { temp: 72, condition: "Sunny", humidity: 45, windSpeed: 8 },
    forecast: [
      { day: "Mon", temp: 72, condition: "Sunny" },
      { day: "Tue", temp: 75, condition: "Partly Cloudy" },
      { day: "Wed", temp: 68, condition: "Cloudy" },
      { day: "Thu", temp: 70, condition: "Sunny" },
      { day: "Fri", temp: 73, condition: "Rainy" },
    ],
  },
  {
    id: 2,
    name: "London",
    current: { temp: 62, condition: "Cloudy", humidity: 70, windSpeed: 12 },
    forecast: [
      { day: "Mon", temp: 62, condition: "Cloudy" },
      { day: "Tue", temp: 64, condition: "Partly Cloudy" },
      { day: "Wed", temp: 60, condition: "Rainy" },
      { day: "Thu", temp: 63, condition: "Cloudy" },
      { day: "Fri", temp: 65, condition: "Partly Cloudy" },
    ],
  },
]