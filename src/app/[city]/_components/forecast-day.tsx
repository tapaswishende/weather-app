import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherIcon } from "@/app/_components/weather-icons";
import { CityWithWeather } from "@/app/[city]/_constants";
import { TForecast, TForecastDay } from "@/lib/types";


const ForecastDay: React.FC<{ day: TForecastDay }> = ({ day }) => (
  <div className="text-center">
    <div className="font-bold">{new Date(day.date).toLocaleDateString('en-US', { day: '2-digit', weekday: 'short' })}</div>
    <div className="text-sm">
      {day.day.mintemp_c}°C - {day.day.maxtemp_c}°C
    </div>
    <div><img src={day.day.condition.icon} alt={day.day.condition.text} className="mx-auto w-8 h-8" /></div>
    <div className="text-xs">{day.day.condition.text}</div>
  </div>
)

export const Forecast: React.FC<{forecast:TForecast}> = ({ forecast }) => (
  <Card className="mt-4">
    <CardHeader>
      <CardTitle>{forecast.forecastday.length}-Day Forecast</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-7 gap-4">
        {forecast.forecastday.map((day, index) => (
          <ForecastDay key={index} day={day} />
        ))}
      </div>
    </CardContent>
  </Card>
)