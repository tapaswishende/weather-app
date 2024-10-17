import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherIcon } from "@/app/_components/weather-icons";
import { CityWithWeather } from "@/app/details-view/_constants";

export const ForecastDay: React.FC<{ day: CityWithWeather['forecast'][0] }> = ({ day }) => (
  <div className="text-center">
    <div className="font-bold">{day.day}</div>
    <div className="text-2xl">{day.temp}°F</div>
    <div><WeatherIcon condition={day.condition} /></div>
    <div className="text-sm">{day.condition}</div>
  </div>
)

export const Forecast: React.FC<{ forecast: CityWithWeather['forecast'] }> = ({ forecast }) => (
  <Card className="mt-4">
    <CardHeader>
      <CardTitle>5-Day Forecast</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <ForecastDay key={index} day={day} />
        ))}
      </div>
    </CardContent>
  </Card>
)