import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Thermometer, Wind } from "lucide-react";
import { WeatherIcon } from "@/app/_components/weather-icons";
import { CityWithWeather } from "@/app/[city]/_constants";
import { TWeatherCurrent } from "@/lib/types";

export const CurrentWeather: React.FC<{ current: TWeatherCurrent }> = ({ current }) => (
  <Card>
    <CardHeader>
      <CardTitle>Current Weather</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between">
        <div className="text-4xl font-bold">{current.temp_c}°C / {current.temp_f}°F</div>
        <div className="flex items-center space-x-2">
          <span className="text-xl">{current.condition.text}</span>
          <img src={current.condition.icon} alt={current.condition.text} className="w-8 h-8" />
        </div>
      </div>
      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <Droplets className="mr-1 h-4 w-4" />
          Humidity: {current.humidity}%
        </div>
        <div className="flex items-center">
          <Wind className="mr-1 h-4 w-4" />
          Wind: {current.wind_kph} km/h
        </div>
        <div className="flex items-center">
          <Thermometer className="mr-1 h-4 w-4" />
          Feels like: {current.feelslike_c}°C / {current.feelslike_f}°F
        </div>
      </div>
    </CardContent>
  </Card>
)