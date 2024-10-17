'use client';

import React from "react";
import { cityWithWeathers } from "@/app/details-view/_constants";
import { CurrentWeather } from "@/app/details-view/_components/current-weather";
import { Forecast, ForecastDay } from "@/app/details-view/_components/forecast-day";
import { TemperatureChart } from "@/app/details-view/_components/temperature-chart";

export default async function Home() {

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Detailed Weather Information</h1>

      <CurrentWeather current={cityWithWeathers[0].current} />
      <Forecast forecast={cityWithWeathers[0].forecast} />
      <TemperatureChart forecast={cityWithWeathers[0].forecast} />
    </div>
  );
}
