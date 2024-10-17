import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Wind } from "lucide-react";
import { WeatherIcon } from "@/app/_components/weather-icons";
import { CityWithWeather } from "@/app/details-view/_constants";

export const CurrentWeather: React.FC<{ current: CityWithWeather['current'] }> = ({ current }) => (
  <Card>
    <CardHeader>
      <CardTitle>Current Weather</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between">
        <div className="text-4xl font-bold">{current.temp}°F</div>
        <div className="flex items-center space-x-2">
          <span className="text-xl">{current.condition}</span>
          <WeatherIcon condition={current.condition} />
        </div>
      </div>
      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <Droplets className="mr-1 h-4 w-4" />
          Humidity: {current.humidity}%
        </div>
        <div className="flex items-center">
          <Wind className="mr-1 h-4 w-4" />
          Wind: {current.windSpeed} mph
        </div>
      </div>
    </CardContent>
  </Card>
)