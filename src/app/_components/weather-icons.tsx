import { Cloud, CloudRain, Sun } from "lucide-react";

export const WeatherIcon: React.FC<{ condition: string }> = ({ condition }) => {
  switch (condition) {
    case "Sunny":
      return <Sun className="h-6 w-6 text-yellow-500" />
    case "Cloudy":
      return <Cloud className="h-6 w-6 text-gray-500" />
    case "Rainy":
      return <CloudRain className="h-6 w-6 text-blue-500" />
    default:
      return null
  }
}